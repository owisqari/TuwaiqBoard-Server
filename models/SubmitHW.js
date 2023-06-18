const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submithomeworkSchema = new Schema(
  {
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: "bootcamp",
    },
    homeworkId: {
      type: Schema.Types.ObjectId,
      ref: "homework",
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    // status: {
    //   type: String,
    // },
    url: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const submitHW = mongoose.model("submitHW", submithomeworkSchema);

module.exports = submitHW;
