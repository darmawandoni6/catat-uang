// Declare a global type
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      NODE_ENV: string;

      DATABASE_URL: string;
      DIRECT_URL: string;

      ACCESS_TOKEN: string;
      EXP_TOKEN: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      URL_CLIENT: string;
    }
  }
}

// Ensure TypeScript treats this as a module
export {};
