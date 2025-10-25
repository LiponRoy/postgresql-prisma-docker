import { ApiError } from "../../utils/ApiError";
import { hashPassword, isUserExistsByEmail } from "../../utils/auth.utils";
import { PrismaClient, User } from '../../../generated/prisma';
import { ISignupUserRequest } from "./user.type";

const prisma = new PrismaClient();

const signupUser = async (body:ISignupUserRequest)=> {

    const { name, email, password, role } = body;

    const existingUser = await isUserExistsByEmail(email);
    if (existingUser) throw new ApiError(400, 'User already exists');

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: (role as any) || 'USER' },
    });

    return { id: user.id, name: user.name, email: user.email, role: user.role };
  
};

export const userService = {
  signupUser,
}