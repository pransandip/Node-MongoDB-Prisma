import express from "express";
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
} from "../controller/post.controller.js";
import { isLoggedIn } from "../middleware/middleware.js";

router.route("/create").post(isLoggedIn, createPost);
router.route("/update/:id").put(isLoggedIn, updatePost);
router.route("/delete/:id").delete(isLoggedIn, deletePost);
router.route("/getall").get(getPosts);

export { router as postRouter };
