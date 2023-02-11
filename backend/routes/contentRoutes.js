import express from "express";
import { createContent, deleteContent, getContentById, getContents, togglePublishStatus, updateContent } from "../controllers/contentController.js";
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, createContent);
router.get("/", protect, getContents);
router.get("/:id", getContentById);
router.put("/:id", protect, updateContent);
router.delete("/:id", protect, deleteContent);
router.put("/status/:id", protect, togglePublishStatus);

export default router;
