import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  blockUser,
  deleteUser, // Import the deleteUser controller function
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import { checkUserExists } from "../middleware/auth.js";
import User from "../models/User.js";
const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.post("/block/:id", blockUser);

/* DELETE */
router.delete("/:id", verifyToken, deleteUser); // Add this line for deleting a user
// Route to check if a user exists
router.post("/check-user", checkUserExists, (req, res) => {
  // Optionally, you can access req.user if you attached the user object in middleware
  const { userId } = req.body;
  res.status(200).json({ message: "User exists.", user: req.user });
});
export default router;
