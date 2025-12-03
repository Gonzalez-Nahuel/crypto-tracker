declare namespace NodeJS {
  interface ProcessEnv {
    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
    ACCESS_TOKEN_EXPIRES: string;
    REFRESH_TOKEN_EXPIRES: string;
  }
}
