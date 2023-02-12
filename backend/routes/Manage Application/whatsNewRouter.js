import express from "express";
import { createWhatsNew, deleteWhatsNew, getWhatsNew, getWhatsNews, togglePublishStatus, updateWhatsNew } from "../../controllers/Manage Application/whatsNewController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, createWhatsNew);
router.get("/", getWhatsNews);
router.get("/:id", getWhatsNew);
router.put("/:id", protect, updateWhatsNew);
router.delete("/:id", protect, deleteWhatsNew);
router.put("/status/:id", protect, togglePublishStatus);

export default router;
