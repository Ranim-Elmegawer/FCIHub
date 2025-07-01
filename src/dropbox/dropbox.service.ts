import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DropboxShareLinkResponse, DropboxTokenResponse } from './dropbox.interface';

@Injectable()
export class DropboxService {
    private accessToken: string;
    private refreshToken: string;
    private clientId: string;
    private clientSecret: string;
    private tokenExpiry: Date;

    constructor(private readonly configService: ConfigService) {
        this.refreshToken = this.configService.get<string>('DROPBOX_REFRESH_TOKEN');
        this.clientId = this.configService.get<string>('DROPBOX_CLIENT_ID');
        this.clientSecret = this.configService.get<string>('DROPBOX_CLIENT_SECRET');

        if (!this.refreshToken || !this.clientId || !this.clientSecret) {
            throw new InternalServerErrorException('Missing Dropbox credentials');
        }
    }

    private async isAccessTokenValid(): Promise<boolean> {
        const bufferMs = 5 * 60 * 1000;
        return !!this.accessToken && !!this.tokenExpiry && this.tokenExpiry > new Date(Date.now() + bufferMs);
    }

    private async getAccessToken(): Promise<string> {
        if (await this.isAccessTokenValid()) return this.accessToken;

        try {
            const response = await axios.post<DropboxTokenResponse>(
                'https://api.dropboxapi.com/oauth2/token',
                new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken,
                }),
                {
                    auth: {
                        username: this.clientId,
                        password: this.clientSecret,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            this.accessToken = response.data.access_token;
            this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
            return this.accessToken;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async uploadFile(file: Express.Multer.File, folder = ''): Promise<string> {
        if (!file || !file.buffer) throw new BadRequestException('No file provided');

        const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;
        const dropboxPath = `/uploads/${folder}/${fileName}`;

        try {
            await axios.post('https://content.dropboxapi.com/2/files/upload', file.buffer, {
                headers: {
                    Authorization: `Bearer ${await this.getAccessToken()}`,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': JSON.stringify({
                        path: dropboxPath,
                        mode: 'add',
                        autorename: true,
                        mute: false,
                    }),
                },
            });

            let sharedUrl = await this.createShareLink(dropboxPath);
            return this.convertToDirectLink(sharedUrl);
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    private async createShareLink(path: string): Promise<string> {
        try {
            const res = await axios.post<DropboxShareLinkResponse>(
                'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
                {
                    path,
                    settings: {
                        requested_visibility: 'public',
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${await this.getAccessToken()}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return res.data.url;
        } catch (error) {
            const tag = error.response?.data?.error?.['.tag'];
            const metadata = error.response?.data?.error?.shared_link_already_exists?.metadata;

            if (tag === 'shared_link_already_exists' && metadata?.url) {
                return metadata.url;
            }

            this.handleAxiosError(error);
        }
    }

    private convertToDirectLink(shareUrl: string): string {
        if (!shareUrl) throw new BadRequestException('Invalid share link');

        const url = new URL(shareUrl);
        url.searchParams.set('raw', '1');
        url.searchParams.delete('dl');

        return url.toString();
    }

    private handleAxiosError(error: any): never {
        const status = error.response?.status;
        const message = error.response?.data?.error_summary || error.message;

        console.error('Dropbox error:', error.response?.data || error.message);

        if (status === 400) throw new BadRequestException(`Bad request: ${message}`);
        if (status === 401 || status === 403) throw new UnauthorizedException(`Authentication failed: ${message}`);
        if (status === 503) throw new ServiceUnavailableException(`Dropbox service unavailable: ${message}`);

        throw new InternalServerErrorException(`Dropbox error: ${message}`);
    }
}
