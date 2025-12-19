import { Request, Response } from "express";
import { syncUser } from "../services/user.service";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    console.log("AUTH HIT:", (req as any).auth?.userId);

    const clerkUserId = (req as any).auth!.userId;
    const email = (req as any).auth?.sessionClaims?.email;

    const user = await syncUser(clerkUserId, email);

    res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
