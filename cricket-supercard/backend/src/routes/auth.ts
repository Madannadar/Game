import express from "express";
import { requireAuth } from "../middleware/clerkAuth";
import { getCurrentUser } from "../controllers/auth.controller";

const router = express.Router();

// Route calls the controller
router.get("/me", requireAuth, getCurrentUser);

export default router;
