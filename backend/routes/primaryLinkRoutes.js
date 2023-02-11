import express from "express";
import { addPrimaryLink, deletePrimaryLink, getPrimaryLink, getPrimaryLinks, updatePrimaryLink } from "../controllers/primaryLinkController.js";
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, addPrimaryLink);
router.get("/", protect, getPrimaryLinks);
router.get("/:id", getPrimaryLink);
router.put("/:id", protect, updatePrimaryLink);
router.delete("/:id", protect, deletePrimaryLink);

export default router;
