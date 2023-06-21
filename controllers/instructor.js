const instructorDB = require("../models/InstructorModel");
const annauncementsDB = require("../models/AnnaunModel");
const courseMaterialDB = require("../models/CourseMaterial");
const homeworkDB = require("../models/HomeWorksModel");
const studentDB = require("../models/StudentModel");
const submitHWDB = require("../models/SubmitHW");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);

exports.register = async (req, res) => {
  const fullName = req.body.fullName;
  const username = req.body.username;
  const password = req.body.password;

  // Validate the input
  if (!username || !password) {
    res.status(400).json({ message: "Please enter all required fields" });
    return;
  }
  try {
    const user = await instructorDB.findOne({ username });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // Hash the password
    const hash = await bcrypt.hash(password, saltRounds);
    // Create a new user
    const savedUser = await instructorDB.create({
      username: username,
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

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // search the user in the database
  const user = await instructorDB.findOne({ username });

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
    const annauncements = await annauncementsDB.find().populate("instructorId");
    res.status(200).json({ annauncements });
  } catch (err) {
    console.log(err);
  }
};
exports.createAnnauncements = async (req, res) => {
  const message = req.body.message;

  try {
    const annauncements = await annauncementsDB.create({
      message: message,
      instructorId: res.locals.userId,
    });
    const instructor = await instructorDB.findOneAndUpdate(
      { _id: res.locals.userId },
      { $push: { annauncements: annauncements._id } },
      { new: true }
    );

    res
      .status(200)
      .json({ annauncements, instructorFullName: instructor.fullName });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAnnauncements = async (req, res) => {
  const annauncementsId = req.params.annauncementsId;
  try {
    const annauncements = await annauncementsDB.findOneAndDelete({
      _id: annauncementsId,
    });
    res.status(200).json({ annauncements });
  } catch (err) {
    console.log(err);
  }
};

exports.getCourseMaterial = async (req, res) => {
  try {
    const courseMaterial = await courseMaterialDB
      .find()
      .populate("instructorId");
    res.status(200).json({ courseMaterial });
  } catch (err) {
    console.log(err);
  }
};
exports.courseMaterial = async (req, res) => {
  const contant = req.body.contant;

  try {
    const courseMaterial = await courseMaterialDB.create({
      contant: contant,
      instructorId: res.locals.userId,
    });
    const instructor = await instructorDB.findOneAndUpdate(
      { _id: res.locals.userId },
      { $push: { courseMaterial: courseMaterial._id } },
      { new: true }
    );

    res
      .status(200)
      .json({ courseMaterial, instructorFullName: instructor.fullName });
  } catch (err) {
    console.log(err);
  }
};

exports.deletecourseMaterial = async (req, res) => {
  const courseMaterialId = req.params.courseMaterialId;
  try {
    const courseMaterial = await courseMaterialDB.findOneAndDelete({
      _id: courseMaterialId,
    });
    res.status(200).json({ courseMaterial });
  } catch (err) {
    console.log(err);
  }
};

exports.getHomework = async (req, res) => {
  try {
    const homework = await homeworkDB.find().populate("submtionId");
    res.status(200).json({ homework });
  } catch (err) {
    console.log(err);
  }
};
exports.createHomework = async (req, res) => {
  const title = req.body.title;
  const status = req.body.status;
  const description = req.body.description;
  const students = await studentDB.find();
  const studentId = students.map((student) => student._id);
  const deadline = req.body.deadline;

  try {
    const homework = await homeworkDB.create({
      title: title,
      status: status,
      description: description,
      studentId: studentId,
      deadline: deadline,
      instructorId: res.locals.userId,
    });
    await instructorDB.findOneAndUpdate(
      { _id: res.locals.userId },
      { $push: { homework: homework._id } },
      { new: true }
    );

    res.status(200).json({ homework });
  } catch (err) {
    console.log(err);
  }
};

exports.getSubmition = async (req, res) => {
  const homeworkId = req.params.homeworkId;
  try {
    const submition = await submitHWDB
      .find({ homeworkId: homeworkId })
      .populate("studentId");
    res.status(200).json({ submition });
  } catch (err) {
    console.log(err);
  }
};
