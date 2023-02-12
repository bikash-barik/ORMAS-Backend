import express from "express";
import { addGlobalLink, deleteGlobalLink, getGlobalLink, getGlobalLinks, updateGlobalLink } from "../../controllers/Links Management/globalLinkController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, addGlobalLink);
router.get("/", getGlobalLinks);
router.get("/:id", getGlobalLink);
router.put("/:id", protect, updateGlobalLink);
router.delete("/:id", protect, deleteGlobalLink);

export default router;
