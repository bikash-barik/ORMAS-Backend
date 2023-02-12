import express from "express";
import {
  getOfficerProfileById,
  getOfficerProfiles,
  CreateOfficerProfile,
  DeleteOfficerProfile,
  UpdateOfficerProfile,
} from "../../controllers/Content Management/OfficerProfileController.js";
const router = express.Router();
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get(getOfficerProfiles);
router
  .route("/:id")
  .get(getOfficerProfileById)
  .delete(protect, DeleteOfficerProfile)
  .put(protect, UpdateOfficerProfile);
router.route("/create").post(protect, CreateOfficerProfile);

export default router;
