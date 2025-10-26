import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import jwt from 'jsonwebtoken';
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

  // getting refresh token
  const refreshToken = req.cookies['refreshToken-Me'];

  // verify refreshToken with refreshToken and it's refresh_secret
   const decodeToken = jwt.verify(refreshToken,ENV.jwt.refresh_secret);

   // If expired refresh token, then it will null or empty, 
   if (!decodeToken) throw new ApiError(400, 'Invalid refreshToken please Login again');

   // if refresh token valid then create an access token again from refreshToken's payload . 
  // create payload from decodeToken
   const payload ={ id: decodeToken.id, email: decodeToken.email, role: decodeToken.role }

   const newAccessToken = jwt.sign(payload, ENV.jwt.access_secret, {
       expiresIn: ENV.jwt.access_expires_in,
     });

  // Set newAccessToken to cookie
  res.cookie('accessToken-Me', newAccessToken, {
    httpOnly: true,
    // secure: false, 
    sameSite: 'none',
    maxAge: 1 * 60 * 1000, // 1 minuit
  });

  // finally
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'handleRefreshToken and create access token again successful',
    data: { }, 
  });
});

export const userController = {
  signupUser,
  loginUser,
  logout,
  handleRefreshToken
};
