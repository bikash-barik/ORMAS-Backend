import Gallery from "../../models/Manage Application/galleryModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user Gallerys
// @route   GET /api/Gallerys
// @access  Private
const getGallerys = asyncHandler(async (req, res) => {
  const gallerys = await Gallery.find({ user: req.user._id });
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
//@access          Private
const CreateGallery = asyncHandler(async (req, res) => {
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
//@access          Private
const DeleteGallery = asyncHandler(async (req, res) => {
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
// @access  Private
const UpdateGallery = asyncHandler(async (req, res) => {
  const { headline,category, photo, status} = req.body;

  const gallery = await Gallery.findById(req.params.id);

  if (gallery.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (gallery) {
    gallery.headline = headline;
    gallery.photo = photo;
    gallery.category = category;
    gallery.status = status;
   

    const updatedGallery = await gallery.save();
    res.json(updatedGallery);
  } else {
    res.status(404);
    throw new Error("Gallery not found");
  }
});

export { getGalleryById, getGallerys,CreateGallery,DeleteGallery,UpdateGallery };
