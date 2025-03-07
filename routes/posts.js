import express from "express";
import { getFeedPosts, getUserPosts, likePost, usercomments ,deletePostsByUser} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comments", verifyToken, usercomments);
/* DELETE */

router.delete('/posts/user/:userId', deletePostsByUser);


export default router;
