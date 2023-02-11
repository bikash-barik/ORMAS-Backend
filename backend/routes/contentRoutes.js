import express from "express";
import { createContent, deleteContent, getContentById, getContents, togglePublishStatus, updateContent } from "../controllers/contentController.js";
const router = express.Router();

router.post("/", createContent);
router.get("/", getContents);
router.get("/:id", getContentById);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);
router.put("/status/:id", togglePublishStatus);

export default router;
