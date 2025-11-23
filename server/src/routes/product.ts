import { Router, Request, Response } from "express";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client';
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

router.get("/", async (_req: Request, res: Response) => {
  const search = _req.query.search as string | undefined

  try {
    const products = await prisma.product.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { category: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
    });
    res.json({ status: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to fetch products." });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ status: false, message: "Name, price, and category are required." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        category
      }
    });

    res.json({ status: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to create product." });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    const existingProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existingProduct) {
      return res.status(404).json({ status: false, message: "Product not found." });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name ?? existingProduct.name,
        price: price !== undefined ? Number(price) : existingProduct.price,
        category: category ?? existingProduct.category
      }
    });

    res.json({ status: true, data: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to update product." });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existingProduct) {
      return res.status(404).json({ status: false, message: "Product not found." });
    }

    await prisma.product.delete({ where: { id: Number(id) } });

    res.json({ status: true, message: "Product deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to delete product." });
  }
});

export default router;
