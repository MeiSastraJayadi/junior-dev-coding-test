import { Router, Request, Response } from "express";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client'
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

router.get("/", async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json({
    status: true, 
    data : products
  });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, price, category } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      price: Number(price),
      category
    }
  });

  res.json(product);
});

export default router;
