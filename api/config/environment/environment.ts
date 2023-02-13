interface ProcessEnv {
  readonly POSTGRES_USER: string;
  readonly POSTGRES_PASSWORD: string;
  readonly POSTGRES_DB: string;
  readonly NODE_POSTGRES_HOST: string;
}

const env = process.env as any as ProcessEnv;

export const environment = {
  postgres: {
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    host: env.NODE_POSTGRES_HOST,
  }
} as const;
