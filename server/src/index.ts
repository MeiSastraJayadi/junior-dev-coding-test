import express from "express";
import cors from "cors";
import http from "http";
import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import dotenv from "dotenv";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const server = http.createServer(app);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
