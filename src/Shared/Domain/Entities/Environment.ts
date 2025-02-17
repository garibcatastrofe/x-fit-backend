export const ENUM_NODE_ENV = {
  development: 'development',
  production: 'production',
} as const;

export type NodeEnv = (typeof ENUM_NODE_ENV)[keyof typeof ENUM_NODE_ENV];

export interface Environment {
  NODE_ENV: NodeEnv;
  PORT: number;
  DATABASE_URL: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
}