import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const checkUserExists = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user; // Optionally, you can attach the user object to req.user
    next();
  } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({ message: "Server error." });
  }
}