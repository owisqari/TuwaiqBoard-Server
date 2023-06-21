const express = require("express");
const router = express.Router();

// import the controllers
const {
  register,
  login,
  getAnnauncements,
  getCourseMaterial,
  getHomework,
  submitHomework,
} = require("../controllers/student");
const { verifyUser } = require("../middlewares/userAuth");

// routes
router.post("/Register", register);
router.post("/Login", login);
router.get("/getAnnauncements", verifyUser, getAnnauncements);
router.get("/getCourseMaterial", verifyUser, getCourseMaterial);
router.get("/getHomework", verifyUser, getHomework);
router.post("/submitHomework/:homeworkId", verifyUser, submitHomework);

module.exports = router;
