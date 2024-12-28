const express = require("express");
const app = express();
require("dotenv").config(); // load enviorment varialbles

const connectDB = require("./config/db"); // import DB connection
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");

// console.log("server", process.env);
connectDB();

/**Routes */
app.use(express.json()); // parse JSON bodies
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);

app.listen(8082, () => {
  console.log("Server is Running at port 8082");
});
