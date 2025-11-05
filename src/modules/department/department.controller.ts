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

// Get all departments
export const getAllDepartments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await departmentService.getAllDepartments();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Departments retrieved successfully!",
      data: result,
    });
  }
);


// Get single department by ID
export const getSingleDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await departmentService.getSingleDepartment(+id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Department retrieved successfully!",
      data: result,
    });
  }
);


// Update Department
export const updateDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // get department id from URL
    const result = await departmentService.updateDepartment(+id, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Department updated successfully!",
      data: result,
    });
  }
);

// Delete department
export const deleteDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await departmentService.deleteDepartment(+id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Department deleted successfully!",
      data: result,
    });
  }
);


export const departmentController = {
  createDepartment,
  updateDepartment,
  getSingleDepartment,
  getAllDepartments,
  deleteDepartment
};
