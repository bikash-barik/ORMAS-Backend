import Gallery from "../../models/Manage Application/galleryModel.js";
import Permission from "../../models/permissionModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user Gallerys
// @route   GET /api/Gallerys
// @access  Private (requires manager rights)
const getGallerys = asyncHandler(async (req, res) => {
  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'application',
  //     feature: 'gallery'
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
  // const gallerys = await Gallery.find({ user: req.user._id });
  const gallerys = await Gallery.find();
  res.json(gallerys);
});

//@description     Fetch single Gallery
//@route           GET /api/Gallerys/:id
//@access          Public
const getGalleryById = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    res.json(gallery);
  } else {
    res.status(404).json({ message: "gallery not found" });
  }

  res.json(gallery);
});

//@description     Create single Gallery
//@route           GET /api/Gallerys/create
//@access          Private (requires author rights)
const CreateGallery = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'gallery'
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
  const { headline,category, photo, status} = req.body;

  if (!headline || !category || !photo || !status) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const gallery = new Gallery({ user: req.user._id, headline,category, photo,status });

    const createdGallery = await gallery.save();

    res.status(201).json(createdGallery);
  }
});

//@description     Delete single Gallery
//@route           GET /api/Gallerys/:id
//@access          Private (requires manager rights)
const DeleteGallery = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'gallery'
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
  const gallery = await Gallery.findById(req.params.id);

  if (gallery.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (gallery) {
    await gallery.remove();
    res.json({ message: "Gallery Removed" });
  } else {
    res.status(404);
    throw new Error("Gallery not Found");
  }
});

// @desc    Update a Gallery
// @route   PUT /api/Gallerys/:id
// @access  Private (requires editor rights)
const UpdateGallery = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'gallery'
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
  const { headline, category, photo, status} = req.body;

  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    gallery.headline = headline || gallery.headline;
    gallery.category = category || gallery.category;
    gallery.photo = photo || gallery.photo;
    gallery.status = status || gallery.status;

    const updatedGallery = await gallery.save();

    res.json(updatedGallery);
  } else {
    res.status(404);
    throw new Error("gallery not Found");
  }
});


const DeleteGalleries = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'gallery'
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
  const galleryIds = req.body.galleryIds; // An array of gallery ids
  const galleries = await Gallery.find({ _id: { $in: galleryIds } });

  // Check if all galleries belong to the logged-in user
  const invalidGalleries = galleries.filter(
    gallery => gallery.user.toString() !== req.user._id.toString()
  );
  if (invalidGalleries.length > 0) {
    res.status(401);
    throw new Error("You can't perform this action on some galleries");
  }

  const deleteResult = await Gallery.deleteMany({ _id: { $in: galleryIds } });
  if (deleteResult.deletedCount === 0) {
    res.status(404);
    throw new Error("No galleries were found with the provided ids");
  }
  
  res.json({ message: `${deleteResult.deletedCount} galleries were deleted` });
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
      feature: "tender",
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

  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    res.status(404);
    throw new Error("Tender Not Found");
  }


  if (gallery.status === true) {
    gallery.status = false;
  } else if (gallery.status === false) {
    gallery.status = true;
  }

  // gallery.publish_status =
  //   gallery.publish_status === "set" ? "unset" : "set";

  await gallery.save();

  res.status(200).json({
    gallery: gallery,
  });
});


export { getGalleryById,togglePublishStatus, getGallerys, CreateGallery, DeleteGallery, UpdateGallery ,DeleteGalleries};
