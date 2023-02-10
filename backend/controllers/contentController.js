import asyncHandler from "express-async-handler";
import Content from "../models/contentModel.js";


// Create Content
const createContent = asyncHandler(async (req, res) => {
  const { global_link, primary_link, title, content } = req.body;

  const newContent = new Content({
    global_link,
    primary_link,
    title,
    content
  });

  await newContent.save();

  res.status(200).json({
    content: newContent
  });
});

// Get all Contents
const getContents = asyncHandler(async (req, res) => {
  const contents = await Content.find();

  res.status(200).json({
    contents
  });
});

// Get Content by ID
const getContentById = asyncHandler(async (req, res) => {
  const contentId = req.params.id;

  const content = await Content.findById(contentId);

  if (!content) {
    res.status(404);
    throw new Error("Content Not Found");
  }

  res.status(200).json({
    content
  });
});

// Update Content
const updateContent = asyncHandler(async (req, res) => {
  const contentId = req.params.id;
  const { global_link, primary_link, title, content } = req.body;

  const contentToUpdate = await Content.findById(contentId);

  if (!contentToUpdate) {
    res.status(404);
    throw new Error("Content Not Found");
  }

  contentToUpdate.global_link = global_link;
  contentToUpdate.primary_link = primary_link;
  contentToUpdate.title = title;
  contentToUpdate.content = content;

  await contentToUpdate.save();

  res.status(200).json({
    content: contentToUpdate
  });
});

// Delete Content
const deleteContent = asyncHandler(async (req, res) => {
  const contentId = req.params.id;

  const contentToDelete = await Content.findById(contentId);

  if (!contentToDelete) {
    res.status(404);
    throw new Error("Content Not Found");
  }

  await contentToDelete.remove();

  res.status(200).json({
    content: contentToDelete
  });
});


export { getContents, getContentById, createContent, updateContent, deleteContent };
