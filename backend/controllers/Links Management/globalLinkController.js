import asyncHandler from "express-async-handler";
import GlobalLink from "../../models/Links Management/globalLinkModel.js";
import Permission from "../../models/permissionModel.js";


// @desc    Get all global links
// @route   GET /api/globallinks
// @access  Private (requires manager rights)
const getGlobalLinks = asyncHandler(async (req, res) => {

  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'link',
  //     feature: 'global_link'
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
  const globalLinks = await GlobalLink.find();

  res.status(200).json({
    globalLinks
  });
});

// @desc    Get single global link
// @route   GET /api/globallinks/:id
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

// @desc    Add global link
// @route   POST /api/globallinks
// @access  Private (requires author rights)
const addGlobalLink = asyncHandler(async (req, res) => {
  
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'link',
      feature: 'global_link'
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

// @desc    Update global link
// @route   PUT /api/globallinks/:id
// @access  Private (requires editor rights)
const updateGlobalLink = asyncHandler(async (req, res) => {
  
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'link',
      feature: 'global_link'
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

// @desc    Delete global link
// @route   DELETE /api/globallinks/:id
// @access  Private (requires manager rights)
const deleteGlobalLink = asyncHandler(async (req, res) => {
  
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'link',
      feature: 'global_link'
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


// @desc Toggle Status for GlobalLink
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

  const globalLink = await GlobalLink.findById(req.params.id);

  if (!globalLink) {
    res.status(404);
    throw new Error("GlobalLink Not Found");
  }

  globalLink.publish_status =
    globalLink.publish_status === "set" ? "unset" : "set";

  await globalLink.save();

  res.status(200).json({
    globalLink: globalLink,
  });
});

export { getGlobalLinks, getGlobalLink, addGlobalLink, updateGlobalLink, togglePublishStatus, deleteGlobalLink };
