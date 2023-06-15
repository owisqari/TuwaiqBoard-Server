const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bootcampSchema = new Schema(
  {
    bootcampName: {
      type: String,
      required: true,
    },
    instructorId: [
      {
        type: Schema.Types.ObjectId,
        ref: "instructor",
      },
    ],
    studentId: [
      {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const bootcamp = mongoose.model("bootcamp", bootcampSchema);

module.exports = bootcamp;
