// Feedbacks
import asyncHandler from "express-async-handler";
import Feedback from "../../models/Manage Application/feedbackModel.js";
import Permission from "../../models/permissionModel.js";

// @desc Create Feedback
// @route POST /api/feedback
// @access Public (requires author rights)
const createFeedback = asyncHandler(async (req, res) => {

  const { sl_no, name, email } = req.body;

  const newFeedback = new Feedback({
    sl_no,
    name,
    email
  });

  await newFeedback.save();

  res.status(200).json({
    feedback: newFeedback,
  });
});

// @desc Get all Feedbacks
// @route GET /api/feedback
// @access Private (requires manager rights)
const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find();

  res.status(200).json({
    feedbacks,
  });
});

// @desc Get a single Feedback by id
// @route POST /api/feedback/:id
// @access Public
const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error("Feedback Not Found");
  }

  res.status(200).json({
    feedback,
  });
});

// @desc Delete feedback
// @route DELETE /api/feedback/:id
// @access Private (requires editor rights)
const deleteFeedback = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "feedback",
    });

    if (permission.length === 0) {
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if (!(permission[0].editorRights === true)) {
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
  const feedback = await Feedback.findByIdAndDelete(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error("Feedback Not Found");
  }

  res.status(200).json({
    feedback
  });
});

export { getFeedback, getFeedbacks, createFeedback, deleteFeedback };
