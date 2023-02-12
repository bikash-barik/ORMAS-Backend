import express from "express";
import { authSubUser, registerSubUser, toggleStatus, updateSubUserProfile } from "../controllers/subUserController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, registerSubUser);
router.post("/login", authSubUser);
router.route("/profile/:id").put(protect, updateSubUserProfile);
router.route("/status/:id").put(protect, toggleStatus)

export default router;
