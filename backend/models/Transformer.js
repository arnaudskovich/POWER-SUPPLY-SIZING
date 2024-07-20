const mongoose = require("mongoose");

const transformerSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  inputVoltage: {
    type: Number,
    required: true,
  },
  outputVoltage: {
    type: Number,
    required: true,
  },
  inputCurrent: {
    type: Number,
    required: true,
  },
  outputCurrent: {
    type: Number,
    required: true,
  },
  powerRating: {
    type: Number,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
  impedance: {
    type: Number,
    required: true,
  },
  turnsRatio: {
    type: Number,
    required: true,
  },
  regulation: {
    type: Number,
    required: true,
  },
  insulationRating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Transformer = mongoose.model("Transformer", transformerSchema);

module.exports = Transformer;
