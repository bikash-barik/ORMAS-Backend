import Document from "../../models/Manage Application/documentModel.js";
import Permission from "../../models/permissionModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user Documents
// @route   GET /api/Documents
// @access  Private (requires manager rights)
const getDocuments = asyncHandler(async (req, res) => {
  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'application',
  //     feature: 'document'
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
  // const documents = await Document.find({ user: req.user._id });
  const documents = await Document.find();
  res.json(documents);
});

//@description     Fetch single Document
//@route           GET /api/Documents/:id
//@access          Public
const getDocumentById = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (document) {
    res.json(document);
  } else {
    res.status(404).json({ message: "document not found" });
  }

  res.json(document);
});

//@description     Create single Document
//@route           GET /api/Documents/create
//@access          Private (requires author rights)
const CreateDocument = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'document'
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
    const document = new Document({ user: req.user._id, headline,expiryDate, uploadDocument, description,status });

    const createdDocument = await document.save();

    res.status(201).json(createdDocument);
  }
});

//@description     Delete single Document
//@route           GET /api/Documents/:id
//@access          Private (requires manager rights)
const DeleteDocument = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'document'
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
  const document = await Document.findById(req.params.id);

  if (document.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (document) {
    await document.remove();
    res.json({ message: "Document Removed" });
  } else {
    res.status(404);
    throw new Error("Document not Found");
  }
});

// @desc    Update a Document
// @route   PUT /api/Documents/:id
// @access  Private (requires editor rights)
const UpdateDocument = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'document'
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

  const document = await Document.findById(req.params.id);

  if (document.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (document) {
    document.headline = headline;
    document.uploadDocument = uploadDocument;
    document.expiryDate = expiryDate;
    document.description = description;
    document.status = status;
   

    const updatedDocument = await document.save();
    res.json(updatedDocument);
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

export { getDocumentById, getDocuments,CreateDocument,DeleteDocument,UpdateDocument };
