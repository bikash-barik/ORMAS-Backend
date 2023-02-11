import express from "express";
import { addPermissions, fetchPermissions } from "../controllers/permissionController.js";
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();

router.route("/:userId").post(protect, addPermissions);
router.route("/:userId").get(fetchPermissions);

export default router;
