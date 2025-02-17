import { z } from 'zod';
import { Environment, ENUM_NODE_ENV } from '../Domain/Entities/Environment';

const environmentSchema = z.object({
  NODE_ENV: z.enum([ENUM_NODE_ENV.development, ENUM_NODE_ENV.production]),
  PORT: z.number().int().positive(),
  DATABASE_URL: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.number(),
});

export function validateEnvironment(env: unknown): Environment {
  return environmentSchema.parse(env);
}
