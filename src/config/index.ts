import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL as string,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || '10',
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET || 'access_secret',
    refresh_secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
};



