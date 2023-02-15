// WhatsNews
import asyncHandler from "express-async-handler";
import WhatsNew from "../../models/Manage Application/whatsNewModel.js";
import Permission from "../../models/permissionModel.js";

// @desc Create WhatsNew
// @route POST /api/whatsNew
// @access Private (requires author rights)
const createWhatsNew = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "whats_new",
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
  const { sl_no, headline, description, document, publish_status } = req.body;

  const newWhatsNew = new WhatsNew({
    sl_no,
    headline,
    description,
    document,
    publish_status,
    publish_status
  });

  await newWhatsNew.save();

  res.status(200).json({
    whatsNew: newWhatsNew,
  });
});

// @desc Get all WhatsNews
// @route GET /api/whatsNew
// @access Private (requires manager rights)
const getWhatsNews = asyncHandler(async (req, res) => {
  const status = req.query.status;
  let query = {};
  if(status==="set"){
    query = {publish_status: "set"};
  }
  const whatsNews = await WhatsNew.find(query);

  res.status(200).json({
    whatsNews,
  });
});

// @desc Get a single WhatsNew by id
// @route POST /api/whatsNew/:id
// @access Public
const getWhatsNew = asyncHandler(async (req, res) => {
  const whatsNew = await WhatsNew.findById(req.params.id);

  if (!whatsNew) {
    res.status(404);
    throw new Error("WhatsNew Not Found");
  }

  res.status(200).json({
    whatsNew,
  });
});

// @desc Update whatsNew
// @route PUT /api/whatsNew/:id
// @access Private (requires editor rights)
const updateWhatsNew = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "whatsNew",
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
  const whatsNew = await WhatsNew.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!whatsNew) {
    res.status(404);
    throw new Error("WhatsNew Not Found");
  }

  res.status(200).json({
    whatsNew,
  });
});

// @desc Delete whatsNew
// @route DELETE /api/whatsNew/:id
// @access Private (requires editor rights)
const deleteWhatsNew = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "whatsNew",
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
  const whatsNew = await WhatsNew.findByIdAndDelete(req.params.id);

  if (!whatsNew) {
    res.status(404);
    throw new Error("WhatsNew Not Found");
  }

  res.status(200).json({
    whatsNew
  });
});

// @desc Toggle Status for WhatsNew
// @route PUT /api/whatsNew/:id/status
// @access Private (requires editor rights)
const togglePublishStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "whatsNew",
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

  const whatsNew = await WhatsNew.findById(req.params.id);

  if (!whatsNew) {
    res.status(404);
    throw new Error("WhatsNew Not Found");
  }

  whatsNew.publish_status =
    whatsNew.publish_status === "set" ? "unset" : "set";

  await whatsNew.save();

  res.status(200).json({
    whatsNew: whatsNew,
  });
});

export { getWhatsNew, getWhatsNews, createWhatsNew, updateWhatsNew, togglePublishStatus, deleteWhatsNew };
