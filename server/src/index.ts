import express from "express";
import cors from "cors";
import http from "http";
import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 300,                 
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});


app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const server = http.createServer(app);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
