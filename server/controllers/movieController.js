const Movie = require("../models/movieModel");

//addmovie
const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New movie has been added",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
//get all movie
const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies feteched!",
      data: allMovies,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

//update
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    if (!movie) {
      return res.status(404).send({
        success: false,
        message: "Movie not found",
      });
    }
    res.send({
      success: true,
      message: "Movie Updated",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

//deleting
const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    console.log(req.body.movieId);
    res.send({
      success: true,
      message: "The movie has been deleted!",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie };
