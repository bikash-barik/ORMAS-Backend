import express from "express";
import { createVideo, deleteVideo, getVideo, getVideos, togglePublishStatus, updateVideo } from "../../controllers/Manage Application/videoController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, createVideo);
router.get("/", getVideos);
router.get("/:id", getVideo);
router.put("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);
router.put("/status/:id", protect, togglePublishStatus);

export default router;
