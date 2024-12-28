const Theatre = require("../models/theatreModel");

//add
const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "New theatre has been added!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//update
const updateTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.body.theaterId);
    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: "Theatre not found!" });
    }
    await Theatre.findByIdAndUpdate(req.body.theaterId, req.body);
    res.send({ success: true, message: "Theatre updated successfully" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//delete
const deleteTheatre = async (req, res) => {
  try {
    console.log("deleting theatre", req.params.theaterId);
    const theatre = await Theatre.findById(req.params.theaterId);
    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: "Theatre not found!" });
    }
    await Theatre.findByIdAndDelete(req.params.theaterId);
    res.send({
      success: true,
      message: " The theatre has been deleted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//get all theatres for Admin
const getTheatres = async (req, res) => {
  try {
    const alltheatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      message: "All theatres fetched successfully!",
      data: alltheatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
// getting the owner theater by id
const getTheatresOwner = async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.params.ownerId });
    res.send({
      success: true,
      message: "All theatres fetched successfully!",
      data: allTheatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getTheatres,
  getTheatresOwner,
};
