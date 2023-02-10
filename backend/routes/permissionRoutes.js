import express from "express";
import { addPermissions, fetchPermissions } from "../controllers/permissionController.js";
const router = express.Router();

router.route("/:userId").post(addPermissions);
router.route("/:userId").get(fetchPermissions);

export default router;
