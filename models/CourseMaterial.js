const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseMaterialSchema = new Schema(
  {
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: "bootcamp",
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "instructor",
    },
    contant: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const courseMaterial = mongoose.model("courseMaterial", courseMaterialSchema);

module.exports = courseMaterial;
