import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client'
import seedUsers from "./users";
import seedProducts from "./products";
import dotenv from "dotenv";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Running seeds...");

  await seedUsers();
  await seedProducts();

  console.log("All seeds executed!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
