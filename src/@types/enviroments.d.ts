declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORTHTTP: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: number;
    SYNCHRONIZE: boolean;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
    JWT_SECRET: string;
    EXPIRE_ACCESS: string;
    EXPIRE_REFRESH_ACCESS: string;
  }
}
