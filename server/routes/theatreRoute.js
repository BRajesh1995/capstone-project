const express = require("express");
const {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getTheatres,
  getTheatresOwner,
} = require("../controllers/theatreController");
const theatreRouter = express.Router();

//adding a theatre
theatreRouter.post("/add-theatre", addTheatre);

//update a theatre
theatreRouter.post("/update-theatre", updateTheatre);

//delete a theatre
theatreRouter.delete("/delete-theatre/:theatreId", deleteTheatre);

//getting all theatres for admin
theatreRouter.get("/get-all-theatres", getTheatres);

//getting the theater by owner id
theatreRouter.get("/get-all-theatres-by-owner/:ownerId", getTheatresOwner);

module.exports = theatreRouter;
