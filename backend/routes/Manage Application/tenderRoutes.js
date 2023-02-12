import express from "express";
import { createTender, deleteTender, getTender, getTenders, updateTender } from "../../controllers/Manage Application/tenderController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, createTender);
router.get("/", getTenders);
router.get("/:id", getTender);
router.put("/:id", protect, updateTender);
router.delete("/:id", protect, deleteTender);

export default router;
