import asyncHandler from "express-async-handler";
import Tender from "../models/tenderModel.js";


// @desc    Create tender
// @route   POST /api/tender
// @access  Public
const createTender = asyncHandler(async (req, res) => {
  const { 
    tender_no,
    tender_headline,
    closing_date,
    closing_time,
    opening_date,
    opening_time,
    description,
    document_one,
    document_two,
    document_three, 
  } = req.body;

  const newTender = new Tender({
    tender_no,
    tender_headline,
    closing_date,
    closing_time,
    opening_date,
    opening_time,
    description,
    document_one,
    document_two,
    document_three,
  });

  await newTender.save();

  res.status(200).json({
    tender: newTender
  });
});

// @desc    Get all tenders
// @route   GET /api/tender
// @access  Public
const getTenders = asyncHandler(async (req, res) => {
  const tenders = await Tender.find();

  res.status(200).json({
    tenders,
  });
});

// @desc    Get a single tender by id
// @route   POST /api/tender/:id
// @access  Public
const getTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);

  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found");
  }

  res.status(200).json({
    tender
  });
});

// @desc    Update tender
// @route   PUT /api/tender/:id
// @access  Public
const updateTender = asyncHandler(async (req, res) => {
  const tenderId = req.params.id;
  const { tender_no, tender_headline, closing_date, closing_time, opening_date, opening_time, description, document_one, document_two, document_three } = req.body;
  
  const tender = await Tender.findById(tenderId);
  
  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found");
  }
  
  tender.tender_no = tender_no || tender.tender_no;
  tender.tender_headline = tender_headline || tender.tender_headline;
  tender.closing_date = closing_date || tender.closing_date;
  tender.closing_time = closing_time || tender.closing_time;
  tender.opening_date = opening_date || tender.opening_date;
  tender.opening_time = opening_time || tender.opening_time;
  tender.description = description || tender.description;
  tender.document_one = document_one || tender.document_one;
  tender.document_two = document_two || tender.document_two;
  tender.document_three = document_three || tender.document_three;
  
  await tender.save();

  res.status(200).json({
    tender: tender
  });
});

// @desc    Delete tender
// @route   DELETE /api/tender/:id
// @access  Public
const deleteTender = asyncHandler(async (req, res) => {
  const tenderId = req.params.id;
  
  const tender = await Tender.findById(tenderId);
  
  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found");
  }
  
  await tender.remove();
  
  res.status(200).json({
    tender
  });
});


export { getTender, getTenders, createTender, updateTender, deleteTender };
