import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { full_name, sl_no, gender, date_of_birth, image, office_phone, mobile_no, email, username, password, privilege, status } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    full_name,
    sl_no,
    gender,
    date_of_birth,
    image,
    office_phone,
    mobile_no,
    email,
    username,
    password,
    privilege,
    status,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      full_name: user.full_name,
      sl_no: user.sl_no,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
      image: user.image,
      office_phone: user.office_phone,
      mobile_no: user.mobile_no,
      email: user.email,
      username: user.username,
      privilege: user.privilege,
      status: user.status,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Public
const updateUserProfile = asyncHandler(async (req, res) => {
  const { full_name, sl_no, gender, date_of_birth, image, office_phone, mobile_no, email, password, privilege, status } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.full_name = full_name || user.full_name;
    user.sl_no = sl_no || user.sl_no;
    user.gender = gender || user.gender;
    user.date_of_birth = date_of_birth || user.date_of_birth;
    user.image = image || user.image;
    user.office_phone = office_phone || user.office_phone;
    user.mobile_no = mobile_no || user.mobile_no;
    user.email = email || user.email;
    user.privilege = privilege || user.privilege;
    user.status = status || user.status;
    if(password){
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      full_name: updatedUser.full_name,
      sl_no: updatedUser.sl_no,
      gender: updatedUser.gender,
      date_of_birth: updatedUser.date_of_birth,
      image: updatedUser.image,
      office_phone: updatedUser.office_phone,
      mobile_no: updatedUser.mobile_no,
      email: updatedUser.email,
      privilege: updatedUser.privilege,
      status: updatedUser.status,
      // token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    Toggle status ( active / inactive )
// @route   POST /api/users/status/:id
// @access  Public
const toggleStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.status === "active") {
      user.status = "inactive";
    } else {
      user.status = "active";
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      status: updatedUser.status,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});


export { authUser, updateUserProfile, registerUser, toggleStatus };
