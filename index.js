const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const studentRouter = require("./routers/studentRouter");
const instructorRouter = require("./routers/instructorRouter");
const adminRouter = require("./routers/adminRouter");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
  });

app.use(cors());
//config cookie-parser
app.use(cookieParser());
//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// config json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/instructor", instructorRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
