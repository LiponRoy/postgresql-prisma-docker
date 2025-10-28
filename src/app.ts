import express from "express";
import { PrismaClient } from "../generated/prisma";
// import { ENV } from "./config";
import cors from 'cors'
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { userRoutes } from "./modules/user/user.routes";
import cookieParser from 'cookie-parser';
import notFound from "./middlewares/notFound";

const app = express();
app.use(express.json());
//Parse cookies
app.use(cookieParser());
app.use(cors());
const prisma = new PrismaClient();



app.get("/", (req, res) => res.send(" Express + Prisma + Docker + TypeScript"));
app.use('/api/v1/user', userRoutes);

// Error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
