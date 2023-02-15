import express from "express";
import { addPrimaryLink, deletePrimaryLink, getPrimaryLink, getPrimaryLinks, togglePublishStatus, updatePrimaryLink } from "../../controllers/Links Management/primaryLinkController.js";
import { protect } from '../../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", protect, addPrimaryLink);
router.get("/", getPrimaryLinks);
router.get("/:id", getPrimaryLink);
router.put("/:id", protect, updatePrimaryLink);
router.put("status/:id", protect, togglePublishStatus);
router.delete("/:id", protect, deletePrimaryLink);

export default router;
