import asyncHandler from "express-async-handler";
import PrimaryLink from "../../models/Links Management/primaryLinkModel.js";
import Permission from "../../models/permissionModel.js";


// @desc    Get all primary links
// @route   GET /api/primarylinks
// @access  Private (requires manager rights)
const getPrimaryLinks = asyncHandler(async (req, res) => {
  
  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'link',
  //     feature: 'primary_link'
  //   });
    
  //   if(permission.length === 0){
  //     res.status(400);
  //     throw new Error("You are not authorized to do this");
  //   }
  //   if(!(permission[0].managerRights === true)){
  //     res.status(400);
  //     throw new Error("You are not authorized to do this");
  //   }
  // }
  let primaryLinks;
  const globalLink = req.query.globalLink
  if(globalLink){
    primaryLinks = await PrimaryLink.find({ global_link :globalLink});
    
  } else{
    primaryLinks = await PrimaryLink.find();
  }
  res.status(200).json({
    primaryLinks
  });
});

// @desc    Get single primary link
// @route   GET /api/primarylinks/:id
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

// @desc    Add primary link
// @route   POST /api/primarylinks
// @access  Private (requires author rights)
const addPrimaryLink = asyncHandler(async (req, res) => {
  
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'link',
      feature: 'primary_link'
    });
    
    if(permission.length === 0){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if(!(permission[0].authorRights === true)){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
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

// @desc    Update primary link
// @route   PUT /api/primarylinks/:id
// @access  Private (requires editor rights)
const updatePrimaryLink = asyncHandler(async (req, res) => {
    
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'link',
      feature: 'primary_link'
    });
    
    if(permission.length === 0){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if(!(permission[0].editorRights === true)){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
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

// @desc    Delete primary link
// @route   DELETE /api/primarylinks/:id
// @access  Private (requires manager rights)
const deletePrimaryLink = asyncHandler(async (req, res) => {
    
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'link',
      feature: 'primary_link'
    });
    
    if(permission.length === 0){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if(!(permission[0].managerRights === true)){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
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

// @desc Toggle Status for PrimaryLink
// @route PUT /api/globallinks/:id/status
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

  const primaryLink = await PrimaryLink.findById(req.params.id);

  if (!primaryLink) {
    res.status(404);
    throw new Error("PrimaryLink Not Found");
  }

  primaryLink.publish_status =
    primaryLink.publish_status === "set" ? "unset" : "set";

  await primaryLink.save();

  res.status(200).json({
    primaryLink: primaryLink,
  });
});

export { getPrimaryLink, getPrimaryLinks, addPrimaryLink, deletePrimaryLink, updatePrimaryLink, togglePublishStatus };
