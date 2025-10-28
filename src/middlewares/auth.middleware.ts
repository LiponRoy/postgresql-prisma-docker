import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ENV from '../config';
import { ApiError } from '../utils/ApiError';

// ✅ Verify access token
export const auth = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies['accessToken-Me'];

      if (!token) {
        throw new ApiError(401, 'Access token missing. Please log in.');
      }

      // verify token
      const decoded = jwt.verify(token, ENV.jwt.access_secret) as JwtPayload;

      // attach user info to req for later use
      (req as any).user = decoded;

      // check role-based access
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        throw new ApiError(403, 'Forbidden. You do not have access to this resource.');
      }

      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        next(new ApiError(401, 'Access token expired. Please refresh token.'));
      } else if (error.name === 'JsonWebTokenError') {
        next(new ApiError(401, 'Invalid access token.'));
      } else {
        next(error);
      }
    }
  };
};
