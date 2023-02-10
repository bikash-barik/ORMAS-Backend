import asyncHandler from "express-async-handler";
import PrimaryLink from "../models/primaryLinkModel.js";


// @desc    Get all primary links
// @route   GET /api/primary-links
// @access  Public
const getPrimaryLinks = asyncHandler(async (req, res) => {
  const primaryLinks = await PrimaryLink.find();

  res.status(200).json({
    primaryLinks
  });
});

// @desc    Get single primary link
// @route   GET /api/primary-links/:id
// @access  Public
const getPrimaryLink = asyncHandler(async (req, res) => {
  const primaryLink = await PrimaryLink.findById(req.params.id);

  if (!primaryLink) {
    res.status(400);
    throw new Error("PrimaryLink not found");
  }

  res.status(200).json({
    primaryLink
  });
});

const addPrimaryLink = asyncHandler(async (req, res) => {
  const { global_link, link_name, sl_no, link_type, function_name, window_status, publish_status } = req.body;
  
  const newPrimaryLink = new PrimaryLink({
    global_link,
    link_name,
    sl_no,
    link_type,
    function_name,
    window_status,
    publish_status
  });

  await newPrimaryLink.save();

  res.status(200).json({
    primaryLink: newPrimaryLink
  });
});

const updatePrimaryLink = asyncHandler(async (req, res) => {
  const primaryLinkId = req.params.id;
  
  const primaryLink = await PrimaryLink.findById(primaryLinkId);
  
  if (!primaryLink) {
  res.status(404);
    throw new Error("Primary Link Not Found");
  }
  
  // Destructure updated properties from request body
  const {
    global_link,
    link_name,
    sl_no,
    link_type,
    function_name,
    window_status,
    publish_status
  } = req.body;
  
  // Update primary link with the new values
  primaryLink.global_link = global_link;
  primaryLink.link_name = link_name;
  primaryLink.sl_no = sl_no;
  primaryLink.link_type = link_type;
  primaryLink.function_name = function_name;
  primaryLink.window_status = window_status;
  primaryLink.publish_status = publish_status;
  
  // Save the updated primary link to the database
  await primaryLink.save();
  
  // Return the updated primary link
  res.status(200).json({
    primaryLink: primaryLink
  });
});

const deletePrimaryLink = asyncHandler(async (req, res) => {
  const primaryLinkId = req.params.id;
  
  const primaryLink = await PrimaryLink.findById(primaryLinkId);
  
  if (!primaryLink) {
    res.status(404);
    throw new Error("Primary Link Not Found");
  }
  
  // Remove the primary link from the database
  const deletedPrimaryLink = await primaryLink.remove();
  
  // Return a success message
  res.status(200).json({
    primaryLink: deletedPrimaryLink
  });
});

export { getPrimaryLink, getPrimaryLinks, addPrimaryLink, deletePrimaryLink, updatePrimaryLink };
