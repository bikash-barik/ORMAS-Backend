import ImportantLink from "../../models/Manage Application/importantLinkModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user ImportantLink
// @route   GET /api/ImportantLink
// @access  Private
const getImportantLinks = asyncHandler(async (req, res) => {
  const importantLinks = await ImportantLink.find({ user: req.user._id });
  res.json(importantLinks);
});

//@description     Fetch single ImportantLink
//@route           GET /api/ImportantLinks/:id
//@access          Public
const getImportantLinkById = asyncHandler(async (req, res) => {
  const importantLink = await ImportantLink.findById(req.params.id);

  if (importantLink) {
    res.json(importantLink);
  } else {
    res.status(404).json({ message: "Important Link not found" });
  }

  res.json(importantLink);
});

//@description     Create single importantLink
//@route           GET /api/importantLinks/create
//@access          Private
const CreateImportantLink = asyncHandler(async (req, res) => {
  const { importantLinkdata, url} = req.body;

  if (!importantLinkdata || !url) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const importantLink = new ImportantLink({ user: req.user._id, importantLinkdata, url });

    const createdImportantLink = await importantLink.save();

    res.status(201).json(createdImportantLink);
  }
});

//@description     Delete single ImportantLink
//@route           GET /api/ImportantLinks/:id
//@access          Private
const DeleteImportantLink = asyncHandler(async (req, res) => {
  const importantLink = await ImportantLink.findById(req.params.id);

  if (importantLink.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (importantLink) {
    await importantLink.remove();
    res.json({ message: "Important Link Removed" });
  } else {
    res.status(404);
    throw new Error("Important Link not Found");
  }
});

// @desc    Update a importantLink
// @route   PUT /api/ImportantLinks/:id
// @access  Private
const UpdateImportantLink = asyncHandler(async (req, res) => {
  const { importantLinkdata, url} = req.body;

  const importantLink = await ImportantLink.findById(req.params.id);

  if (importantLink.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (importantLink) {
    importantLink.importantLinkdata = importantLinkdata;
    importantLink.url = url;
   
   

    const updatedImportantLink = await importantLink.save();
    res.json(updatedImportantLink);
  } else {
    res.status(404);
    throw new Error("News Update not found");
  }
});

export { getImportantLinkById, getImportantLinks,CreateImportantLink,DeleteImportantLink,UpdateImportantLink };
