import express from "express";
import {
  getDocumentById,
  getDocuments,
  CreateDocument,
  DeleteDocument,
  UpdateDocument,
} from "../../controllers/Manage Application/documentController.js";
const router = express.Router();
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get( getDocuments);
router
  .route("/:id")
  .get(getDocumentById)
  .delete(protect, DeleteDocument)
  .put(protect, UpdateDocument);
router.route("/create").post(protect, CreateDocument);

export default router;
