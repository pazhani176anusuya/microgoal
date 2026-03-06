
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const errormiddleware = require("./Middlewares/errormiddleware");
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(express.json());
const PORT = process.env.PORT||5000;
const Mongo_Url = process.env.MONGO_URI;
const AuthRouter = require("./Router/AuthRouter");
const GoalRouter = require("./Router/GoalRouter");
console.log(process.env.JWT_SECRET);

//mongoDB connection
mongoose
  .connect(Mongo_Url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
//route
app.use("/auth", AuthRouter);
app.use("/goal", GoalRouter);

app.use(errormiddleware);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

