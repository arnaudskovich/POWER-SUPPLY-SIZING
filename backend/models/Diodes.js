// models/RectifierDiode.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const DiodeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  Vrevmax: { type: Number, required: true }, // Maximum reverse voltage in volts
  Vdrop: { type: Number, required: true }, // Forward voltage drop in volts
  Ifwd: { type: Number, required: true }, // Forward current in amps
  manufacturer: { type: String, required: true },
  description: { type: String },
  package: { type: String },
  temperatureRange: { type: String },
  datasheet: { type: String },
});

const Diode = mongoose.model("diodes", DiodeSchema);

module.exports = Diode;
