declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
