import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Permission from "../models/permissionModel.js";

//@description     Add permissions for a user
//@route           POST /api/permissions/:userId
//@access          Public
const addPermissions = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const permissions = req.body.permissions;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  // Create the permissions
  const list = permissions.map(permission => {
    return new Permission({
      user: userId,
      feature: permission.feature,
      category: permission.category,
      authorRights: permission.authorRights,
      editorRights: permission.editorRights,
      publisherRights: permission.publisherRights,
      managerRights: permission.managerRights
    });
  });

  // Save new permissions
  const savedPermissions = await Promise.all(
    list.map(permission => permission.save())
  );

  // Return saved permissions
  res.status(201).json({
    permissions: savedPermissions
  });

});


//@description     Add permissions for a user
//@route           GET /api/permissions/:userId
//@access          Public
const fetchPermissions = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  
  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  
  // Find permissions by user ID
  const permissions = await Permission.find({ user: userId });
  

  // Return found permissions
  res.status(200).json({
    permissions: permissions
  });

});


export { addPermissions, fetchPermissions };
