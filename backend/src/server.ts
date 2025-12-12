import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { limiter, securityHeaders } from "./middleware/security";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(limiter);
app.use(securityHeaders);

// Configure CORS to allow requests from the frontend
app.use(
  cors({
    origin: [
      "https://house-of-edtech-iota.vercel.app",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Import routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRUD API" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
