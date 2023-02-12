// import OfficerProfile from "../../models/Content Management/OfficerProfileModel";
import OfficerProfile from "../../models/Content Management/OfficerProfileModel.js";
import asyncHandler from "express-async-handler";
import Permission from '../../models/permissionModel.js'

// @desc    Get logged in user OfficerProfiles
// @route   GET /api/OfficerProfiles
// @access  Private (requires manager rights)
const getOfficerProfiles = asyncHandler(async (req, res) => {
  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'content',
  //     feature: 'officer_profile'
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
  // const officerprofiles = await OfficerProfile.find({ user: req.user._id });
  const officerprofiles = await OfficerProfile.find();
  res.json(officerprofiles);
});

//@description     Fetch single OfficerProfile
//@route           GET /api/OfficerProfiles/:id
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

//@description     Create single OfficerProfile
//@route           GET /api/OfficerProfiles/create
//@access          Private (requires author rights)
const CreateOfficerProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'content',
      feature: 'officer_profile'
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
  const { officername,qualification, designation, serial, createdon,photo } = req.body;

  if (!officername || !qualification || !designation || !serial || !createdon || !photo) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const officerProfile = new OfficerProfile({ user: req.user._id, officername,qualification, designation, serial,createdon,photo });

    const createdOfficerProfile = await officerProfile.save();

    res.status(201).json(createdOfficerProfile);
  }
});

//@description     Delete single OfficerProfile
//@route           GET /api/OfficerProfiles/:id
//@access          Private (requires manager rights)
const DeleteOfficerProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'content',
      feature: 'officer_profile'
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
  const officerProfile = await OfficerProfile.findById(req.params.id);

  // if (officerProfile.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (officerProfile) {
    await officerProfile.remove();
    res.json({ message: "Officer Profile Removed" });
  } else {
    res.status(404);
    throw new Error("Officer Profile not Found");
  }
});

// @desc    Update a OfficerProfile
// @route   PUT /api/OfficerProfiles/:id
// @access  Private (requires editor rights)
const UpdateOfficerProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'content',
      feature: 'officer_profile'
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
  const { officername,qualification, designation, serial, createdon,photo } = req.body;

  const officerProfile = await OfficerProfile.findById(req.params.id);

  if (officerProfile.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (officerProfile) {
    officerProfile.officername = officername;
    officerProfile.designation = designation;
    officerProfile.qualification = qualification;
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

export { getOfficerProfileById, getOfficerProfiles,CreateOfficerProfile,DeleteOfficerProfile,UpdateOfficerProfile };
