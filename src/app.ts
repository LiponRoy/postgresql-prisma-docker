import express from "express";
import { PrismaClient } from "../generated/prisma";
import { ENV } from "./config";
import cors from 'cors'
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
app.use(cors());
const prisma = new PrismaClient();
app.use(express.json());


app.get("/", (req, res) => res.send(" Express + Prisma + Docker + TypeScript"));
app.use('/api/v1/user', userRoutes);

// app.get("/user", async (req, res) => {
//    const user = await prisma.user.findMany();
//   res.json(user);
// });

// app.post("/user", async (req, res) => {
//   const { name,email,password} = req.body;
//   const user = await prisma.user.create({ data: { name,email,password} });
//   res.json(user);
// });

// Error handler
app.use(globalErrorHandler);

export default app;
