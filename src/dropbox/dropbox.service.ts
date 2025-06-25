import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class DropboxService {
    private clientId = process.env.DROPBOX_CLIENT_ID;
    private clientSecret = process.env.DROPBOX_CLIENT_SECRET;
    private refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
    private accessToken: string;

    async getAccessToken(): Promise<string> {
        const res = await axios.post(
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
            },
        );

        const data = res.data as { access_token: string };
        this.accessToken = data.access_token;
        return this.accessToken;
    }

    async uploadFile(filePath: string, dropboxPath: string): Promise<string> {
        const accessToken = await this.getAccessToken();
        const fileContent = fs.readFileSync(filePath);

        const uploadRes = await axios.post(
            'https://content.dropboxapi.com/2/files/upload',
            fileContent,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: dropboxPath,
                        mode: 'add',
                        autorename: true,
                        mute: false,
                    }),
                    'Content-Type': 'application/octet-stream',
                },
            },
        );

        const uploadData = uploadRes.data as { path_display: string };

        const sharedRes = await axios.post(
            'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
            { path: uploadData.path_display },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        const sharedData = sharedRes.data as { url: string };

        return sharedData.url.replace('?dl=0', '?raw=1');
    }
}
