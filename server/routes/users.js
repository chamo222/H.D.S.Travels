// server/routes/users.js
import express from "express";
import dotenv from "dotenv";
import { Clerk } from "@clerk/clerk-sdk-node";
import User from "../models/User.js"; // ✅ new MongoDB model

dotenv.config();

const router = express.Router();
const clerkClient = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

/**
 * GET /api/users
 * Fetch users from Clerk and sync to MongoDB
 */
router.get("/", async (req, res) => {
  try {
    const clerkUsers = await clerkClient.users.getUserList({ limit: 50 });

    const formattedUsers = await Promise.all(
      clerkUsers.map(async (user) => {
        const role = user.publicMetadata?.role || "user"; // Clerk role
        const email = user.emailAddresses?.[0]?.emailAddress || "No Email";

        // ✅ Sync with MongoDB
        const dbUser = await User.findOneAndUpdate(
          { clerkId: user.id },
          {
            clerkId: user.id,
            email,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            imageUrl: user.imageUrl || user.profileImageUrl || "/default-profile.png",
            role,
          },
          { new: true, upsert: true }
        );

        return {
          id: user.id,
          fullName:
            (user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.username) || "No Name",
          email,
          profileImageUrl: dbUser.imageUrl,
          role: dbUser.role,
        };
      })
    );

    res.json(formattedUsers);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users. Check Clerk key." });
  }
});

/**
 * POST /api/users/make-driver
 */
router.post("/make-driver", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    // Update in Clerk
    await clerkClient.users.updateUser(userId, { publicMetadata: { role: "driver" } });

    // Update in MongoDB
    await User.findOneAndUpdate({ clerkId: userId }, { role: "driver" });

    res.json({ message: `User ${userId} is now a driver.` });
  } catch (err) {
    console.error("❌ Error promoting user to driver:", err);
    res.status(500).json({ error: "Failed to promote user to driver." });
  }
});

/**
 * POST /api/users/make-admin
 */
router.post("/make-admin", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    await clerkClient.users.updateUser(userId, { publicMetadata: { role: "admin" } });
    await User.findOneAndUpdate({ clerkId: userId }, { role: "admin" });

    res.json({ message: `User ${userId} is now an admin.` });
  } catch (err) {
    console.error("❌ Error promoting user to admin:", err);
    res.status(500).json({ error: "Failed to promote user to admin." });
  }
});

/**
 * POST /api/users/remove-role
 */
router.post("/remove-role", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    await clerkClient.users.updateUser(userId, { publicMetadata: { role: "user" } });
    await User.findOneAndUpdate({ clerkId: userId }, { role: "user" });

    res.json({ message: `User ${userId} role has been reset to 'user'.` });
  } catch (err) {
    console.error("❌ Error removing user role:", err);
    res.status(500).json({ error: "Failed to remove user role." });
  }
});

export default router;