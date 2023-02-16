import express from "express";
import { createBanner, deleteBanner, getBanner, getBanners, togglePublishStatus, updateBanner } from "../../controllers/Manage Application/bannerController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/create", protect, createBanner);
router.get("/", getBanners);
router.get("/:id", getBanner);
router.put("/:id", protect, updateBanner);
router.delete("/:id", protect, deleteBanner);
router.put("/status/:id", protect, togglePublishStatus);

export default router;
