import express from "express";
import { getGallerys, getGalleryById, CreateGallery, UpdateGallery, DeleteGallery, DeleteGalleries,togglePublishStatus } from "../../controllers/Manage Application/galleryController.js";
const router = express.Router();
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get(getGallerys);
router
  .route("/:id")
  .get(getGalleryById)
  .put(protect, UpdateGallery)
  .delete(protect, DeleteGallery);
router.route("/create").post(protect, CreateGallery);
router.route("/delete-multiple").post(protect, DeleteGalleries);
router.put("/status/:id", protect, togglePublishStatus);
export default router;
