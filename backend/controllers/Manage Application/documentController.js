import Document from "../../models/Manage Application/documentModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user Documents
// @route   GET /api/Documents
// @access  Private
const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.user._id });
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
//@access          Private
const CreateDocument = asyncHandler(async (req, res) => {
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
//@access          Private
const DeleteDocument = asyncHandler(async (req, res) => {
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
// @access  Private
const UpdateDocument = asyncHandler(async (req, res) => {
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
