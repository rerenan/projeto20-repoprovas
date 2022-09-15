declare namespace NodeJS {
    export interface ProcessEnv {
      HOST: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }