const studentDB = require("../models/StudentModel");
const annauncementsDB = require("../models/AnnaunModel");
const courseMaterialDB = require("../models/CourseMaterial");
const homeworkDB = require("../models/HomeWorksModel");
const submitHWDB = require("../models/SubmitHW");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);

// register a new student account
exports.register = async (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  // Validate the input
  if (!username || !password) {
    res.status(400).json({ message: "Please enter all required fields" });
    return;
  }
  try {
    const user = await studentDB.findOne({ username });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // Hash the password
    const hash = await bcrypt.hash(password, saltRounds);
    // Create a new user
    const savedUser = await studentDB.create({
      username: username,
      email: email,
      password: hash,
      fullName: fullName,
    });
    // generate a token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const saverUserData = {
      username: savedUser.username,
      fullName: savedUser.fullName,
    };
    res.status(200).json({ saverUserData, token: token });
  } catch (err) {
    console.log(err);
  }
};
// login a student account with username and password
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // search the user in the database
  const user = await studentDB.findOne({ username });

  if (user) {
    // compare the password with the hash
    const hash = user.password;
    const isPassword = await bcrypt.compare(password, hash);
    if (isPassword) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token: token });
    } else {
      res.status(403).json({ message: "Invalid password" });
    }
  } else {
    res.status(403).json({ message: "User does not exist" });
  }
};

exports.getAnnauncements = async (req, res) => {
  try {
    const annauncements = await annauncementsDB.find();
    res.status(200).json({ annauncements });
  } catch (err) {
    console.log(err);
  }
};

exports.getCourseMaterial = async (req, res) => {
  try {
    const courseMaterial = await courseMaterialDB.find();
    res.status(200).json({ courseMaterial });
  } catch (err) {
    console.log(err);
  }
};

exports.getHomework = async (req, res) => {
  try {
    const homework = await homeworkDB.find();
    if (homework.status === "live") {
      res.status(200).json({ homework });
    } else {
      res.status(403).json({ message: "You can't see this homework" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.submitHomework = async (req, res) => {
  const homeworkId = req.params.homeworkId;

  try {
    const submitHW = await submitHWDB.create({
      homeworkId: homeworkId,
      studentId: res.locals.userId,
      url: req.body.url,
    });

    await homeworkDB.findByIdAndUpdate(homeworkId, {
      $push: { submtionId: submitHW._id },
    });

    res.status(200).json({ submitHW });
  } catch (err) {
    console.log(err);
  }
};
