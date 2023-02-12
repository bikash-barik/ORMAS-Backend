// Logos
import asyncHandler from "express-async-handler";
import Logo from "../../models/Manage Application/logoModel.js";
import Permission from "../../models/permissionModel.js";

// @desc Create Logo
// @route POST /api/logo
// @access Private (requires author rights)
const createLogo = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "logo",
    });

    if (permission.length === 0) {
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if (!(permission[0].authorRights === true)) {
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
  const { sl_no, logo_title, photo, home_page_status } = req.body;

  const newLogo = new Logo({
    sl_no,
    logo_title,
    photo,
    home_page_status,
  });

  await newLogo.save();

  res.status(200).json({
    logo: newLogo,
  });
});

// @desc Get all Logos
// @route GET /api/logo
// @access Private (requires manager rights)
const getLogos = asyncHandler(async (req, res) => {
  const logos = await Logo.find();

  res.status(200).json({
    logos,
  });
});

// @desc Get a single Logo by id
// @route POST /api/logo/:id
// @access Public
const getLogo = asyncHandler(async (req, res) => {
  const logo = await Logo.findById(req.params.id);

  if (!logo) {
    res.status(404);
    throw new Error("Logo Not Found");
  }

  res.status(200).json({
    logo,
  });
});

// @desc Update Video
// @route PUT /api/video/:id
// @access Private (requires editor rights)
const updateVideo = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "video",
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
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!video) {
    res.status(404);
    throw new Error("Video Not Found");
  }

  res.status(200).json({
    video,
  });
});

// @desc Delete Video
// @route DELETE /api/video/:id
// @access Private (requires editor rights)
const deleteVideo = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "video",
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
  const video = await Video.findByIdAndDelete(req.params.id);

  if (!video) {
    res.status(404);
    throw new Error("Video Not Found");
  }

  res.status(200).json({
    success: true,
    message: "Video deleted successfully",
  });
});

// @desc Toggle Status for Logo
// @route PUT /api/logo/:id/status
// @access Private (requires editor rights)
const toggleStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "logo",
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

  const logo = await Logo.findById(req.params.id);

  if (!logo) {
    res.status(404);
    throw new Error("Logo Not Found");
  }

  logo.publish_status =
    logo.publish_status === "active" ? "inactive" : "active";

  await logo.save();

  res.status(200).json({
    success: true,
    message: `Logo status has been updated to ${logo.publish_status}`,
    logo: logo,
  });
});

export { toggleStatus };
