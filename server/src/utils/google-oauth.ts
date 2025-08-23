import { OAuth2Client } from "google-auth-library";

export const redirect_url = "http://localhost:4000/api/oauth";
export const oauth2Client = new OAuth2Client({
  client_id: String(process.env.GOOGLE_CLIENT_ID),
  client_secret: String(process.env.GOOGLE_CLIENT_SECRET),
  redirectUri: redirect_url,
});
