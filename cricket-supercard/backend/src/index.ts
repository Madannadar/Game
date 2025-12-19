import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/auth";
import "dotenv/config";

const app = express();
// console.log(process.env.CLERK_SECRET_KEY);

/**
 * 1️⃣ CORS FIRST
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/**
 * 2️⃣ BODY PARSER
 */
app.use(express.json());

/**
 * 3️⃣ CLERK MIDDLEWARE (ABSOLUTELY REQUIRED)
 */
app.use(clerkMiddleware());

/**
 * 4️⃣ TEST ROUTE
 */
app.get("/", (req, res) => {
  console.log("Root hit");
  res.send("Backend running");
});

/**
 * 5️⃣ AUTH ROUTES
 */
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
