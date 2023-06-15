const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    bootcamp: [
      {
        type: Schema.Types.ObjectId,
        ref: "bootcamp",
      },
    ],
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    homeworks: [
      {
        type: Schema.Types.ObjectId,
        ref: "homework",
      },
    ],
    annauncements: [
      {
        type: Schema.Types.ObjectId,
        ref: "annauncement",
      },
    ],
    courseMaterial: [
      {
        type: Schema.Types.ObjectId,
        ref: "courseMaterial",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const instructor = mongoose.model("instructor", instructorSchema);

module.exports = instructor;
