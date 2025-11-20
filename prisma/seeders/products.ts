import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client'
import dotenv from "dotenv";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function seedProduct() {
  const products = [
    {
        name: "Laptop Lenovo ThinkPad X1",
        price: 18999000,
        category: "Electronics"
      },
      {
        name: "Iphone 15 Pro Max",
        price: 20999000,
        category: "Electronics"
      },
      {
        name: "Mechanical Keyboard Keychron K6",
        price: 1299000,
        category: "Accessories"
      },
      {
        name: "Sony WH-1000XM5",
        price: 5499000,
        category: "Accessories"
      },
      {
        name: "Samsung 4K Smart TV 55 Inch",
        price: 7999000,
        category: "Electronics"
      },
      {
        name: "Nike Air Jordan 1",
        price: 2999000,
        category: "Fashion"
      },
      {
        id: 7,
        name: "Adidas Ultraboost 23",
        price: 2499000,
        category: "Fashion"
      },
      {
        name: "Gaming Chair Secretlab TITAN Evo",
        price: 7799000,
        category: "Furniture"
      },
      {
        name: "Apple MacBook Air M3",
        price: 16999000,
        category: "Electronics"
      },
      {
        name: "Logitech MX Master 3S",
        price: 1499000,
        category: "Accessories"
      }
  ];

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log("Seeder: 10 products created!");
}

export default seedProduct;