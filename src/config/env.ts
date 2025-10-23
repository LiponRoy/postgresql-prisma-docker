import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL as string,
};
