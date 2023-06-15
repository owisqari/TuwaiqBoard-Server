const studentDB = require("../models/StudentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);

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
      res.status(400).json({ message: "Invalid password" });
    }
  } else {
    res.status(400).json({ message: "User does not exist" });
  }
};
