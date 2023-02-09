import express from "express";
import {
  getNewsUpdateById,
  getNewsUpdates,
  CreateNewsUpdate,
  DeleteNewsUpdate,
  UpdateNewsUpdate,
} from "../../controllers/Manage Application/newsUpdateController.js";
const router = express.Router();
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get(protect, getNewsUpdates);
router
  .route("/:id")
  .get(getNewsUpdateById)
  .delete(protect, DeleteNewsUpdate)
  .put(protect, UpdateNewsUpdate);
router.route("/create").post(protect, CreateNewsUpdate);

export default router;
