import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
 
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
  const { user, accessToken} = await userService.loginUser(email, password);

  // Set HttpOnly cookie
  res.cookie('accessToken-Me', accessToken, {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax',
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

  res.clearCookie('accessToken-Me');
  

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logout successful',
    data: { }, 
  });
});

export const userController = {
  signupUser,
  loginUser,
  logout
};
