import express from "express";
import { getGallerys, getGalleryById, CreateGallery, UpdateGallery, DeleteGallery } from "../../controllers/Manage Application/galleryController.js";
const router = express.Router();
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get(getGallerys);
router
  .route("/:id")
  .get(getGalleryById)
  .delete(protect, UpdateGallery)
  .put(protect, DeleteGallery);
router.route("/create").post(protect, CreateGallery);

export default router;
