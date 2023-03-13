import express from "express";
import { createTender, deleteTender, getTender, getTenders, togglePublishStatus, updateTender } from "../../controllers/Manage Application/tenderController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/create", protect, createTender);
router.get("/", getTenders);
router.get("/:id", getTender);
router.put("/:id", protect, updateTender);
router.put("/status/:id", protect, togglePublishStatus);
router.delete("/:id", protect, deleteTender);

export default router;
