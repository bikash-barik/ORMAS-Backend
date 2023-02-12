import express from "express";
import { createLogo, deleteLogo, getLogo, getLogos, togglePublishStatus, updateLogo } from "../../controllers/Manage Application/logoController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, createLogo);
router.get("/", getLogos);
router.get("/:id", getLogo);
router.put("/:id", protect, updateLogo);
router.delete("/:id", protect, deleteLogo);
router.put("/status/:id", protect, togglePublishStatus);

export default router;
