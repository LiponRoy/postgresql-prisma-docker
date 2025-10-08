import express from "express";
import { PrismaClient } from "../generated/prisma";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => res.send(" Express + Prisma + Docker + TypeScript"));

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
