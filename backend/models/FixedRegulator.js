const mongoose = require("mongoose");

const FixedRegulatorSchema = new mongoose.Schema({
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
  outputVoltage: {
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
});

const FixedRegulator = mongoose.model("fixedregulators", FixedRegulatorSchema);

module.exports = FixedRegulator;
