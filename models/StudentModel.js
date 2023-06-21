const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: "bootcamp",
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    homeworksId: [
      {
        type: Schema.Types.ObjectId,
        ref: "homework",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
