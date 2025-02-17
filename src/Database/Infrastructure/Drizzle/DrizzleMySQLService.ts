import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '@/src/Shared/Infrastructure/EnvironmentContainer';
const poolConnection = mysql.createPool({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle({ client: poolConnection });