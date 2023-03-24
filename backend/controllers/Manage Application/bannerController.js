// Banners
import asyncHandler from "express-async-handler";
import Banner from "../../models/Manage Application/bannerModel.js";
import Permission from "../../models/permissionModel.js";

// @desc Create Banner
// @route POST /api/banner
// @access Private (requires author rights)
const createBanner = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "banner",
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
  const { sl_no, caption, banner, publish_status } = req.body;

  const newBanner = new Banner({
    sl_no,
    caption,
    banner,
    publish_status,
    publish_status
  });

  await newBanner.save();

  res.status(200).json({
    banner: newBanner,
  });
});

// @desc Get all Banners
// @route GET /api/banner
// @access Private (requires manager rights)
const getBanners = asyncHandler(async (req, res) => {
  const status = req.query.status;
  let query = {};
  if(status==="set"){
    query = {publish_status: "set"};
  }
  const banners = await Banner.find(query);

  res.status(200).json({
    banners,
  });
});

// @desc Get a single Banner by id
// @route POST /api/banner/:id
// @access Public
const getBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    res.status(404);
    throw new Error("Banner Not Found");
  }

  res.status(200).json({
    banner,
  });
});

// @desc Update banner
// @route PUT /api/banner/:id
// @access Private (requires editor rights)
const updateBanner = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "banner",
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
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!banner) {
    res.status(404);
    throw new Error("Banner Not Found");
  }

  res.status(200).json({
    banner,
  });
});

// @desc Delete banner
// @route DELETE /api/banner/:id
// @access Private (requires editor rights)
const deleteBanner = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "banner",
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
  const banner = await Banner.findByIdAndDelete(req.params.id);

  if (!banner) {
    res.status(404);
    throw new Error("Banner Not Found");
  }

  res.status(200).json({
    banner
  });
});

// @desc Toggle Status for Banner
// @route PUT /api/banner/:id/status
// @access Private (requires editor rights)
const togglePublishStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "banner",
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

  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    res.status(404);
    throw new Error("Banner Not Found");
  }


  
  if (banner.publish_status === "set") {
    banner.publish_status = "unset";
  } else if (banner.publish_status === "unset") {
    banner.publish_status = "set";
  }
  // banner.publish_status =
  //   banner.publish_status === "set" ? "unset" : "set";

  await banner.save();

  res.status(200).json({
    banner: banner,
  });
});

export { getBanner, getBanners, createBanner, updateBanner, togglePublishStatus, deleteBanner };
