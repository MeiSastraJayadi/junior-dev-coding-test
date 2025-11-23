import { Router, Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

router.get("/", async (_req: Request, res: Response) => {
  const search = _req.query.search as string | undefined

  try {
    const users = await prisma.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
    })

    res.status(200).json({ status: true, data: users })
  } catch (err) {
    console.error("Error fetching users:", err)
    res.status(500).json({ status: false, message: "Failed to fetch users" })
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .json({ status: false, message: "Name and email are required" });
  }

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ status: false, message: "Failed to create user" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name && !email) {
    return res
      .status(400)
      .json({ status: false, message: "Nothing to update" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ status: false, message: "Failed to update user" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ status: false, message: "Failed to delete user" });
  }
});

export default router;
