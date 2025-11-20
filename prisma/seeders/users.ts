import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client'
import dotenv from "dotenv";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function seedUsers() {
  const users = [
    { name: "Ethan Parker", email: "ethan.parker@example.com" },
    { name: "Liam Donovan", email: "liam.donovan@example.com" },
    { name: "Aiden Rhodes", email: "aiden.rhodes@example.com" },
    { name: "Noah Williams", email: "noah.williams@example.com" },
    { name: "Mason Carter", email: "mason.carter@example.com" },
    { name: "Logan Walker", email: "logan.walker@example.com" },
    { name: "Owen Mitchell", email: "owen.mitchell@example.com" },
    { name: "Lucas Bennett", email: "lucas.bennett@example.com" },
    { name: "Henry Anderson", email: "henry.anderson@example.com" },
    { name: "Jack Turner", email: "jack.turner@example.com" },
    { name: "Ava Morgan", email: "ava.morgan@example.com" },
    { name: "Sophia Hayes", email: "sophia.hayes@example.com" },
    { name: "Emma Collins", email: "emma.collins@example.com" },
    { name: "Mia Thompson", email: "mia.thompson@example.com" },
    { name: "Isabella Brooks", email: "isabella.brooks@example.com" },
    { name: "Chloe Foster", email: "chloe.foster@example.com" },
    { name: "Harper Reed", email: "harper.reed@example.com" },
    { name: "Ella James", email: "ella.james@example.com" },
    { name: "Aria Bennett", email: "aria.bennett@example.com" },
    { name: "Scarlett Riley", email: "scarlett.riley@example.com" },
  ];

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Seeder: 20 users created!");
}

export default seedUsers