import express from "express";
import { createFeedback, deleteFeedback, getFeedback, getFeedbacks } from "../../controllers/Manage Application/feedbackController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", createFeedback);
router.get("/", getFeedbacks);
router.get("/:id", getFeedback);
router.delete("/:id", protect, deleteFeedback);

export default router;
