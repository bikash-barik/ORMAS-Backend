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
  const { sl_no, logo_title, photo, publish_status } = req.body;

  const newLogo = new Logo({
    sl_no,
    logo_title,
    photo,
    publish_status,
    publish_status
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
  const status = req.query.status;
  let query = {};
  if(status==="set"){
    query = {publish_status: "set"};
  }
  const logos = await Logo.find(query);

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

// @desc Update logo
// @route PUT /api/logo/:id
// @access Private (requires editor rights)
const updateLogo = asyncHandler(async (req, res) => {
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
  const logo = await Logo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!logo) {
    res.status(404);
    throw new Error("Logo Not Found");
  }

  res.status(200).json({
    logo,
  });
});

// @desc Delete logo
// @route DELETE /api/logo/:id
// @access Private (requires editor rights)
const deleteLogo = asyncHandler(async (req, res) => {
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
  const logo = await Logo.findByIdAndDelete(req.params.id);

  if (!logo) {
    res.status(404);
    throw new Error("Logo Not Found");
  }

  res.status(200).json({
    logo
  });
});

// @desc Toggle Status for Logo
// @route PUT /api/logo/:id/status
// @access Private (requires editor rights)
const togglePublishStatus = asyncHandler(async (req, res) => {
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
    logo.publish_status === "set" ? "unset" : "set";

  await logo.save();

  res.status(200).json({
    logo: logo,
  });
});

export { getLogo, getLogos, createLogo, updateLogo, togglePublishStatus, deleteLogo };
