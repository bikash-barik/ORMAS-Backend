import express from "express";
import { addGlobalLink, deleteGlobalLink, getGlobalLink, getGlobalLinks, updateGlobalLink } from "../controllers/globalLinkController.js";
const router = express.Router();

router.post("/", addGlobalLink);
router.get("/", getGlobalLinks);
router.get("/:id", getGlobalLink);
router.put("/:id", updateGlobalLink);
router.delete("/:id", deleteGlobalLink);

export default router;
