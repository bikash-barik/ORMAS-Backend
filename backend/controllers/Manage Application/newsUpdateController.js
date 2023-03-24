import NewsUpdate from "../../models/Manage Application/newsUpdateModel.js";
import Permission from "../../models/permissionModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user NewsUpdates
// @route   GET /api/NewsUpdates
// @access  Private (requires manager rights)
const getNewsUpdates = asyncHandler(async (req, res) => {
  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'application',
  //     feature: 'news_updates'
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
  // const newsUpdates = await NewsUpdate.find({ user: req.user._id });
  const newsUpdates = await NewsUpdate.find();
  res.json(newsUpdates);
});

//@description     Fetch single NewsUpdate
//@route           GET /api/NewsUpdates/:id
//@access          Public
const getNewsUpdateById = asyncHandler(async (req, res) => {
  const newsUpdate = await NewsUpdate.findById(req.params.id);

  if (newsUpdate) {
    res.json(newsUpdate);
  } else {
    res.status(404).json({ message: "News Update not found" });
  }

  res.json(newsUpdate);
});

//@description     Create single NewsUpdate
//@route           GET /api/NewsUpdates/create
//@access          Private (requires author rights)
const CreateNewsUpdate = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'news_updates'
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
  const { headline,expiryDate, uploadDocument, description, status} = req.body;

  if (!headline || !expiryDate || !uploadDocument || !description || !status) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const newsUpdate = new NewsUpdate({ user: req.user._id, headline,expiryDate, uploadDocument, description,status });

    const createdNewsUpdate = await newsUpdate.save();

    res.status(201).json(createdNewsUpdate);
  }
});

//@description     Delete single NewsUpdate
//@route           GET /api/NewsUpdates/:id
//@access          Private (requires manager rights)
const DeleteNewsUpdate = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'news_updates'
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
  const newsUpdate = await NewsUpdate.findById(req.params.id);

  if (newsUpdate.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (newsUpdate) {
    await newsUpdate.remove();
    res.json({ message: "news Update Removed" });
  } else {
    res.status(404);
    throw new Error("news Update not Found");
  }
});

// @desc    Update a NewsUpdate
// @route   PUT /api/NewsUpdates/:id
// @access  Private (requires editor rights)
const UpdateNewsUpdate = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'news_updates'
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
  const { headline,expiryDate, uploadDocument, description, status} = req.body;

  const newsUpdate = await NewsUpdate.findById(req.params.id);

  if (newsUpdate.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (newsUpdate) {
    newsUpdate.headline = headline;
    newsUpdate.uploadDocument = uploadDocument;
    newsUpdate.expiryDate = expiryDate;
    newsUpdate.description = description;
    newsUpdate.status = status;
   

    const updatedNewsUpdate = await newsUpdate.save();
    res.json(updatedNewsUpdate);
  } else {
    res.status(404);
    throw new Error("News Update not found");
  }
});


// @desc Toggle Status for gallery
// @route PUT /api/tenders/:id/status
// @access Private (requires editor rights)
const togglePublishStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user.name && user.privilege !== "superAdmin") {
    const permission = await Permission.find({
      subUser: user._id,
      category: "application",
      feature: "news_updates",
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

  const newsUpdate = await NewsUpdate.findById(req.params.id);

  if (!newsUpdate) {
    res.status(404);
    throw new Error("Tender Not Found");
  }


  if (newsUpdate.status === true) {
    newsUpdate.status = false;
  } else if (newsUpdate.status === false) {
    newsUpdate.status = true;
  }

  // newsUpdate.publish_status =
  //   newsUpdate.publish_status === "set" ? "unset" : "set";

  await newsUpdate.save();

  res.status(200).json({
    newsUpdate: newsUpdate,
  });
});


export { togglePublishStatus,getNewsUpdateById, getNewsUpdates,CreateNewsUpdate,DeleteNewsUpdate,UpdateNewsUpdate };
