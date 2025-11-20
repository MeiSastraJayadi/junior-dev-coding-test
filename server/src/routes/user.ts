import { Router, Request, Response } from "express";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client'
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// GET all users
router.get("/", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({
    status : true, 
    data : users
  });
});

// CREATE user
router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: { name, email }
  });

  res.json(user);
});

export default router;
