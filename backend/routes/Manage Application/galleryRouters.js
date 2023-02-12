import express from "express";
import {
  getgalleryById,
  getgallerys,
  Creategallery,
  Deletegallery,
  Updategallery,
} from "../../controllers/Manage Application/galleryController.js";
const router = express.Router();
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get(getDocuments);
router
  .route("/:id")
  .get(getDocumentById)
  .delete(protect, DeleteDocument)
  .put(protect, UpdateDocument);
router.route("/create").post(protect, CreateDocument);

export default router;
