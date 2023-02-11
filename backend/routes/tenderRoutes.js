import express from "express";
import { createTender, deleteTender, getTender, getTenders, updateTender } from "../controllers/tenderController.js";
const router = express.Router();

router.post("/", createTender);
router.get("/", getTenders);
router.get("/:id", getTender);
router.put("/:id", updateTender);
router.delete("/:id", deleteTender);

export default router;
