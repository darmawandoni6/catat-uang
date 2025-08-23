import { OAuth2Client } from "google-auth-library";

export const redirect_url = `${process.env.URL_CLIENT}/api/oauth`;
export const oauth2Client = new OAuth2Client({
  client_id: String(process.env.GOOGLE_CLIENT_ID),
  client_secret: String(process.env.GOOGLE_CLIENT_SECRET),
  redirectUri: redirect_url,
});
