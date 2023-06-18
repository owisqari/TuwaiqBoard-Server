const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeworkSchema = new Schema(
  {
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: "bootcamp",
    },
    title: {
      type: String,
      required: true,
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "instructor",
    },
    studentId: [
      {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    submtionId: [
      {
        type: Schema.Types.ObjectId,
        ref: "submitHW",
      },
    ],
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const homework = mongoose.model("homework", homeworkSchema);

module.exports = homework;
