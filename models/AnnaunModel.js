const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const annauncementsSchema = new Schema(
  {
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: "bootcamp",
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "instructor",
    },
    message: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const annauncements = mongoose.model("annauncement", annauncementsSchema);

module.exports = annauncements;
