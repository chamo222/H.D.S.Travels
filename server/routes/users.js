import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Clerk } from "@clerk/clerk-sdk-node";

const router = express.Router();
const clerkClient = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

// GET /api/users - list all users with full name, email, profile image, and role
router.get("/", async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList({ limit: 50 });

    const formattedUsers = users.map((user) => {
      const role = user.publicMetadata?.role || "user"; // default role
      return {
        id: user.id,
        fullName:
          (user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.username) || "No Name",
        email: user.emailAddresses?.[0]?.emailAddress || "No Email",
        profileImageUrl: user.imageUrl || user.profileImageUrl || "/default-profile.png",
        role,
      };
    });

    res.json(formattedUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users. Check Clerk key." });
  }
});

// POST /api/users/make-driver - promote a user to driver
router.post("/make-driver", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    await clerkClient.users.updateUser(userId, { publicMetadata: { role: "driver" } });
    res.json({ message: `User ${userId} is now a driver.` });
  } catch (err) {
    console.error("Error promoting user to driver:", err);
    res.status(500).json({ error: "Failed to promote user to driver." });
  }
});

// POST /api/users/make-admin - promote a user to admin
router.post("/make-admin", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    await clerkClient.users.updateUser(userId, { publicMetadata: { role: "admin" } });
    res.json({ message: `User ${userId} is now an admin.` });
  } catch (err) {
    console.error("Error promoting user to admin:", err);
    res.status(500).json({ error: "Failed to promote user to admin." });
  }
});

// POST /api/users/remove-role - demote a user to regular "user"
router.post("/remove-role", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    await clerkClient.users.updateUser(userId, { publicMetadata: { role: "user" } });
    res.json({ message: `User ${userId} role has been removed and set to 'user'.` });
  } catch (err) {
    console.error("Error removing user role:", err);
    res.status(500).json({ error: "Failed to remove user role." });
  }
});

export default router;