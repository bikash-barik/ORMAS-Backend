import asyncHandler from "express-async-handler";
import Content from "../../models/Content Management/contentModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    Create content
// @route   POST /api/content
// @access  Private (requires author rights)
const createContent = asyncHandler(async (req, res) => {

  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    console.log('hello')
    const permission = await Permission.find({
      subUser: user._id,
      category: 'content',
      feature: 'content'
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
  const { global_link, primary_link, title, content } = req.body;

  const newContent = new Content({
    global_link,
    primary_link,
    title,
    content
  });

  await newContent.save();

  res.status(200).json({
    content: newContent
  });
});

// @desc    Get all content
// @route   GET /api/content
// @access  Private (requires manager rights)
const getContents = asyncHandler(async (req, res) => {
  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'content',
  //     feature: 'content'
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
  const contents = await Content.find();

  res.status(200).json({
    contents
  });
});

// @desc    Get content by id
// @route   GET /api/content/:id
// @access  Public
const getContentById = asyncHandler(async (req, res) => {
  const contentId = req.params.id;

  const content = await Content.findById(contentId);

  if (!content) {
    res.status(404);
    throw new Error("Content Not Found");
  }

  res.status(200).json({
    content
  });
});

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private (requires editor rights)
const updateContent = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'content',
      feature: 'content'
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
  const contentId = req.params.id;
  const { global_link, primary_link, title, content } = req.body;

  const contentToUpdate = await Content.findById(contentId);

  if (!contentToUpdate) {
    res.status(404);
    throw new Error("Content Not Found");
  }

  contentToUpdate.global_link = global_link;
  contentToUpdate.primary_link = primary_link;
  contentToUpdate.title = title;
  contentToUpdate.content = content;

  await contentToUpdate.save();

  res.status(200).json({
    content: contentToUpdate
  });
});

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private (requires manager rights)
const deleteContent = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'content',
      feature: 'content'
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
  const contentId = req.params.id;

  const contentToDelete = await Content.findById(contentId);

  if (!contentToDelete) {
    res.status(404);
    throw new Error("Content Not Found");
  }

  await contentToDelete.remove();

  res.status(200).json({
    content: contentToDelete
  });
});

// @desc    Toggle publish status of content
// @route   PUT /api/content/status/:id
// @access  Private (requires publisher rights)
const togglePublishStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'content',
      feature: 'content'
    });
    
    if(permission.length === 0){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if(!(permission[0].publisherRights === true)){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
  const contentId = req.params.id;

  const content = await Content.findById(contentId);

  if (content) {
    if (content.publish_status === "active") {
      content.publish_status = "inactive";
    } else {
      content.publish_status = "active";
    }
    const updatedContent = await content.save();
    res.status(200).json({
      content: updatedContent
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});


export { getContents, getContentById, createContent, updateContent, deleteContent, togglePublishStatus };
