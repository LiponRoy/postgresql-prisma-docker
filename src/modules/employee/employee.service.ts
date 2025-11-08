import { ApiError } from "../../utils/ApiError";
import { generateTokens, hashPassword, isPasswordMatched, isUserExistsByEmail } from "../../utils/auth.utils";
import { PrismaClient, User } from '../../../generated/prisma';

const prisma = new PrismaClient(); 

const creatEemployee = async (body:any)=> {

    const { name,dob,department } = body;

    const employee = await prisma.employee.create({
      data: { name,dob,department },
    });

    return { name: employee.name, dob: employee.dob, department: employee.dob };
  
};

export const employeeService = {
  creatEemployee,

} 