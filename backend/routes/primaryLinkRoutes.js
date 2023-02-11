import express from "express";
import { addPrimaryLink, deletePrimaryLink, getPrimaryLink, getPrimaryLinks, updatePrimaryLink } from "../controllers/primaryLinkController.js";
const router = express.Router();

router.post("/", addPrimaryLink);
router.get("/", getPrimaryLinks);
router.get("/:id", getPrimaryLink);
router.put("/:id", updatePrimaryLink);
router.delete("/:id", deletePrimaryLink);

export default router;
