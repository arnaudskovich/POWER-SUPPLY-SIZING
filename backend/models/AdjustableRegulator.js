const mongoose = require("mongoose");
const uv = require("mongoose-unique-validator");

const adjustableRegulatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  inputMin: {
    type: Number,
    required: true,
  },
  inputMax: {
    type: Number,
    required: true,
  },
  outputMin: {
    type: Number,
    required: true,
  },
  outputMax: {
    type: Number,
    required: true,
  },
  maxOutputCurrent: {
    type: Number,
    required: true,
  },
  maxPowerDissipation: {
    type: Number,
    required: true,
  },
  maxTemperature: {
    type: Number,
    required: true,
  },
  TJA: {
    type: Number,
    required: true,
  },
  calculateResistors: {
    type: String,
    required: true,
  },
});

const AdjustableRegulator = mongoose.model(
  "AdjustableRegulators",
  adjustableRegulatorSchema
);

module.exports = AdjustableRegulator;
