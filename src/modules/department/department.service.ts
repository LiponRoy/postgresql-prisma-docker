import { ApiError } from "../../utils/ApiError";
import { generateTokens, hashPassword, isPasswordMatched, isUserExistsByEmail } from "../../utils/auth.utils";
import { PrismaClient, User } from '../../../generated/prisma';
import { IDepartment} from "./department.type";

const prisma = new PrismaClient();

const createDepartment = async (body:IDepartment)=> {

    const { dep_name,description } = body;

    const department = await prisma.department.create({
      data: { dep_name,description },
    });

    return { dep_name: department.dep_name, description: department.description };
  
};

export const getAllDepartments = async () => {
  const departments = await prisma.department.findMany({
    orderBy: { createdAt: "desc" }, // newest first
  });

  return departments;
};

export const updateDepartment = async (id: number, body: IDepartment) => { 
  const { dep_name, description } = body;

  const updatedDepartment = await prisma.department.update({
    where: { id },
    data: { dep_name, description },
  });

  return {
    dep_name: updatedDepartment.dep_name,
    description: updatedDepartment.description,
  };
};


export const getSingleDepartment = async (id: number) => {
  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    throw new Error("Department not found!");
  }

  return department;
};


export const deleteDepartment = async (id: number) => {
  const existingDepartment = await prisma.department.findUnique({
    where: { id },
  });

  if (!existingDepartment) {
    throw new Error("Department not found!");
  }

  await prisma.department.delete({
    where: { id },
  });

  return { id, deleted: true };
};

export const departmentService = {
  createDepartment,
  updateDepartment,
  getSingleDepartment,
  getAllDepartments,
  deleteDepartment
} 