import { ApiError } from "../../utils/ApiError";
import { generateTokens, hashPassword, isPasswordMatched, isUserExistsByEmail } from "../../utils/auth.utils";
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

const loginUser = async (email: string, password: string)=> {

    const user = await isUserExistsByEmail(email);
    if (!user) throw new ApiError(404, 'User not found');

    const match = await isPasswordMatched(password, user.password);
    if (!match) throw new ApiError(401, 'Invalid credentials');

    const payload = { id: user.id, email: user.email, role: user.role };
    const { accessToken, refreshToken } = generateTokens(payload);

    return { user, accessToken, refreshToken };
};

export const userService = {
  signupUser,
  loginUser
}