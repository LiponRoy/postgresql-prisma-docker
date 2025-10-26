import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import jwt, { JwtPayload } from 'jsonwebtoken';
import ENV from "../../config";
import { ApiError } from "../../utils/ApiError";
 
const signupUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await userService.signupUser(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User registered Successfully !", 
      data: result,
    });
  }
);

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken,refreshToken} = await userService.loginUser(email, password);

  // Set accessToken-Me
  res.cookie('accessToken-Me', accessToken, {
    httpOnly: true,
    // secure: false, 
    sameSite: 'none',
    maxAge: 1 * 60 * 1000, // 1 minuit
  });

  // Set refreshToken-Me
  res.cookie('refreshToken-Me', refreshToken, {
    httpOnly: true,
    // secure: false, 
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: { user}, 
  });
});

// Logout user
export const logout = catchAsync(async (req: Request, res: Response) => {

  // clear both access token and refresh token
  res.clearCookie('accessToken-Me');
  res.clearCookie('refreshToken-Me');
  

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logout successful',
    data: { }, 
  });
});

// handleRefreshToken user
export const handleRefreshToken = catchAsync(async (req: Request, res: Response) => {
  // Get refresh token from cookie
  const refreshToken = req.cookies['refreshToken-Me'];

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token missing. Please log in again.');
  }

  let decoded: JwtPayload;

  try {
    // Verify refresh token with refresh_secret
    decoded = jwt.verify(refreshToken, ENV.jwt.refresh_secret) as JwtPayload;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Refresh token expired. Please log in again.');
    } else if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid refresh token. Please log in again.');
    } else {
      throw new ApiError(401, 'Authentication failed.');
    }
  }

  // Create new access token from decoded payload
  const payload = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };

  const newAccessToken = jwt.sign(payload, ENV.jwt.access_secret, {
    expiresIn: ENV.jwt.access_expires_in,
  });

  // Set new access token as cookie
  res.cookie('accessToken-Me', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ✅ secure in production
    sameSite: 'none',
    maxAge: 1 * 60 * 1000, // 1 minute
  });

  // Send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'New access token issued successfully.',
    data: {},
  });
});


// handle Protected Rote
export const handleProtectedRoute = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.cookies['accessToken-Me'];

  if (!accessToken) {
    throw new ApiError(401, 'Access token missing. Please log in.');
  }

  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(accessToken, ENV.jwt.access_secret) as JwtPayload;
  } catch (error: any) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token expired. Please log in again.');
    } else if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid access token. Please log in again.');
    } else {
      throw new ApiError(401, 'Authentication failed.');
    }
  }

  // If everything okay
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Protected resources access',
    data: { decoded },
  });
});

export const userController = {
  signupUser,
  loginUser,
  logout,
  handleRefreshToken,
  handleProtectedRoute
};
