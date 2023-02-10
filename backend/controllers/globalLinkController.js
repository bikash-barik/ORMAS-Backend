import asyncHandler from "express-async-handler";
import GlobalLink from "../models/globalLinkModel.js";


// @desc    Get all global links
// @route   GET /api/global-links
// @access  Public
const getGlobalLinks = asyncHandler(async (req, res) => {
  const globalLinks = await GlobalLink.find();

  res.status(200).json({
    globalLinks
  });
});

// @desc    Get single global link
// @route   GET /api/global-links/:id
// @access  Public
const getGlobalLink = asyncHandler(async (req, res) => {
  const globalLink = await GlobalLink.findById(req.params.id);

  if (!globalLink) {
    res.status(400);
    throw new Error("GlobalLink not found");
  }

  res.status(200).json({
    globalLink
  });
});

const addGlobalLink = asyncHandler(async (req, res) => {
  const { link_name, sl_no, link_type, function_name, window_status, view_in_menu_item, view_in_footer_link, publish_status } = req.body;
  
  const newGlobalLink = new GlobalLink({
    link_name,
    sl_no,
    link_type,
    function_name,
    window_status,
    view_in_menu_item,
    view_in_footer_link,
    publish_status
  });

  await newGlobalLink.save();

  res.status(200).json({
    globalLink: newGlobalLink
  });
});

const updateGlobalLink = asyncHandler(async (req, res) => {
  const globalLinkId = req.params.id;
  
  const globalLink = await GlobalLink.findById(globalLinkId);
  
  if (!globalLink) {
  res.status(404);
    throw new Error("Global Link Not Found");
  }
  
  // Destructure updated properties from request body
  const {
    link_name,
    sl_no,
    link_type,
    function_name,
    window_status,
    view_in_menu_item,
    view_in_footer_link,
    publish_status
  } = req.body;
  
  // Update global link with the new values
  globalLink.link_name = link_name;
  globalLink.sl_no = sl_no;
  globalLink.link_type = link_type;
  globalLink.function_name = function_name;
  globalLink.window_status = window_status;
  globalLink.view_in_menu_item = view_in_menu_item;
  globalLink.view_in_footer_link = view_in_footer_link;
  globalLink.publish_status = publish_status;
  
  // Save the updated global link to the database
  await globalLink.save();
  
  // Return the updated global link
  res.status(200).json({
    globalLink: globalLink
  });
});

const deleteGlobalLink = asyncHandler(async (req, res) => {
  const globalLinkId = req.params.id;
  
  const globalLink = await GlobalLink.findById(globalLinkId);
  
  if (!globalLink) {
    res.status(404);
    throw new Error("Global Link Not Found");
  }
  
  // Remove the global link from the database
  const deletedGlobalLink = await globalLink.remove();
  
  // Return a success message
  res.status(200).json({
    globalLink: deletedGlobalLink
  });
});

export { getGlobalLinks, getGlobalLink, addGlobalLink, updateGlobalLink, deleteGlobalLink };
