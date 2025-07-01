export interface DropboxTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface DropboxShareLinkResponse {
  url: string;
}