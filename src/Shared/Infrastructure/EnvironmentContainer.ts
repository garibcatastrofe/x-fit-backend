import { Environment } from '../Domain/Entities/Environment';
import { validateEnvironment } from './EnvironmentValidator';

process.loadEnvFile();

export class EnvironmentContainer {
  private static instance: Environment;

  public static getInstance(): Environment {
    if (!this.instance) {
      const envValues = {
        NODE_ENV: process.env.NODE_ENV,
        PORT: Number(process.env.PORT),
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: Number(process.env.DATABASE_PORT),
      };

      try {
        this.instance = validateEnvironment(envValues);
      } catch (error) {
        console.error('Error validating environment variables:', error);
        process.exit(1);
      }
    }

    return this.instance;
  }
}

export const env = EnvironmentContainer.getInstance();
