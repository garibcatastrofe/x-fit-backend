import { defineConfig } from 'drizzle-kit';
import { env } from '@/src/Shared/Infrastructure/EnvironmentContainer';
export default defineConfig({
  dialect: 'mysql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/Database/Infrastructure/Drizzle/schemas',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});