import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '../../generated/prisma';
import config from '../config';

const prisma = new PrismaClient();

export const hashPassword = async (plainText: string): Promise<string> => {
  return await bcrypt.hash(plainText, Number(config.bcrypt_salt_rounds));
};

export const isUserExistsByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const isPasswordMatched = async (
  plainText: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashedPassword);
};

export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, config.jwt.access_secret, {
    expiresIn: config.jwt.access_expires_in,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expires_in,
  });

  return { accessToken, refreshToken };
};
