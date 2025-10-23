import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await userService.createUser(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Created Successfully !",
      data: result,
    });
  }
);

export const userController = {
  createUser,
};