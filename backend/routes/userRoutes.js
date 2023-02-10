import express from "express";
import {
  authUser,
  registerUser,
  toggleStatus,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile/:id").post(updateUserProfile);
router.route("/status/:id").post(toggleStatus);

export default router;
