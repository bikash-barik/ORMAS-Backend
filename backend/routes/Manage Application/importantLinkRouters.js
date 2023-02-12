import express from "express";
import {
  getImportantLinkById,
  getImportantLinks,
  CreateImportantLink,
  DeleteImportantLink,
  UpdateImportantLink,
} from "../../controllers/Manage Application/importantLinkController.js";
const router = express.Router();
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get(getImportantLinks);
router
  .route("/:id")
  .get(getImportantLinkById)
  .delete(protect, DeleteImportantLink)
  .put(protect, UpdateImportantLink);
router.route("/create").post(protect, CreateImportantLink);

export default router;
