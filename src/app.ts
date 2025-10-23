import express from "express";
import { PrismaClient } from "../generated/prisma";
import { ENV } from "./config/env";
import cors from 'cors'
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();
app.use(cors());
const prisma = new PrismaClient();
app.use(express.json());

app.get("/", (req, res) => res.send(" Express + Prisma + Docker + TypeScript"));

app.get("/user", async (req, res) => {
   const user = await prisma.user.findMany();
  res.json(user);
});

app.post("/user", async (req, res) => {
  const { name,email,password} = req.body;
  const user = await prisma.user.create({ data: { name,email,password} });
  res.json(user);
});

// Error handler
app.use(globalErrorHandler);

export default app;
