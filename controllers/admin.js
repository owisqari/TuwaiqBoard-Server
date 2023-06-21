const studentDB = require("../models/StudentModel");
const instructorDB = require("../models/InstructorModel");

exports.getAllUsers = async (req, res) => {
  const student = await studentDB.find();
  const instructor = await instructorDB.find();
  res.status(200).json({ student, instructor });
};
