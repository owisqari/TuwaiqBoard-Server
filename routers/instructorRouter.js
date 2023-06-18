const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/userAuth");

// import the controllers
const {
  register,
  login,
  getAnnauncements,
  createAnnauncements,
  courseMaterial,
  getCourseMaterial,
  deletecourseMaterial,
  createHomework,
  getHomework,
  getSubmition,
  deleteAnnauncements,
} = require("../controllers/instructor");

// routes
router.post("/Register", register);
router.post("/Login", login);
router.get("/getAnnauncements", verifyUser, getAnnauncements);
router.post("/createAnnauncements", verifyUser, createAnnauncements);
router.delete(
  "/deleteAnnauncements/:annauncementsId",
  verifyUser,
  deleteAnnauncements
);
router.get("/getCourseMaterial", verifyUser, getCourseMaterial);
router.post("/courseMaterial", verifyUser, courseMaterial);
router.delete(
  "/deletecourseMaterial/:courseMaterialId",
  verifyUser,
  deletecourseMaterial
);
router.get("/getHomework", verifyUser, getHomework);
router.post("/createHomework", verifyUser, createHomework);
router.get("/getSubmition/:homeworkId", verifyUser, getSubmition);

module.exports = router;
