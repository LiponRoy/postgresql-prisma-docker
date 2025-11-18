import { ApiError } from "../../utils/ApiError";
import { generateTokens, hashPassword, isPasswordMatched, isUserExistsByEmail } from "../../utils/auth.utils";
import { PrismaClient, User } from '../../../generated/prisma';

const prisma = new PrismaClient(); 

const createEmployee = async (data:any)=> {
return await prisma.employee.create({
      data,
      include: { department: true },  //
    });
  
};

const getAllEmployee = async ()=> {
    return await prisma.employee.findMany({
      include: {
        department: true,
      },
    });
  
};

export const employeeService = {
  createEmployee,
  getAllEmployee

} 