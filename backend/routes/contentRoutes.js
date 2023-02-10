import express from "express";
import { createContent, deleteContent, getContentById, getContents, updateContent } from "../controllers/contentController.js";
const router = express.Router();

router.post("/", createContent);
router.get("/", getContents);
router.get("/:id", getContentById);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

export default router;
