import OfficerProfile from "../../models/Content Management/OfficerProfileModel";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getOfficerProfiles = asyncHandler(async (req, res) => {
  const officerprofiles = await OfficerProfile.find({ user: req.user._id });
  res.json(officerprofiles);
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getOfficerProfileById = asyncHandler(async (req, res) => {
  const officerprofile = await OfficerProfile.findById(req.params.id);

  if (officerprofile) {
    res.json(officerprofile);
  } else {
    res.status(404).json({ message: "officerprofile not found" });
  }

  res.json(officerprofile);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const CreateOfficerProfile = asyncHandler(async (req, res) => {
  const { officername, designation, serial, createdon,photo } = req.body;

  if (!officername || !designation || !serial || !createdon || !photo) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const officerProfile = new OfficerProfile({ user: req.user._id, officername, designation, serial,createdon,photo });

    const CreateOfficerProfile = await officerProfile.save();

    res.status(201).json(CreateOfficerProfile);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const DeleteOfficerProfile = asyncHandler(async (req, res) => {
  const officerProfile = await OfficerProfile.findById(req.params.id);

  if (officerProfile.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (officerProfile) {
    await officerProfile.remove();
    res.json({ message: "Officer Profile Removed" });
  } else {
    res.status(404);
    throw new Error("Officer Profile not Found");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const UpdateOfficerProfile = asyncHandler(async (req, res) => {
  const { officername, designation, serial, createdon,photo } = req.body;

  const officerProfile = await OfficerProfile.findById(req.params.id);

  if (officerProfile.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (officerProfile) {
    officerProfile.officername = officername;
    officerProfile.designation = designation;
    officerProfile.serial = serial;
    officerProfile.createdon = createdon;
    officerProfile.photo = photo;

    const updatedOfficerProfile = await officerProfile.save();
    res.json(updatedOfficerProfile);
  } else {
    res.status(404);
    throw new Error("Officer Profile not found");
  }
});

export { getOfficerProfileById, getOfficerProfiles, CreateNote, DeleteNote, UpdateNote };
