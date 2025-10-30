import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { departmentService } from "./department.service";

 
const createDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await departmentService.createDepartment(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Department Create Successfully !", 
      data: result,
    });
  }
);


export const departmentController = {
  createDepartment,
};
