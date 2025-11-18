import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { employeeService } from "./employee.service";


const createEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await employeeService.createEmployee(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Employee Create Successfully !", 
      data: result,
    });
  }
);

const getAllEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await employeeService.getAllEmployee();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Employee Getting Successfully !", 
      data: result,
    });
  }
);


export const employeeController = {
  createEmployee,
  getAllEmployee,
};
