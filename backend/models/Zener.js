// models/ZenerDiode.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const zenerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  Vz: { type: Number, required: true }, // Zener breakdown voltage in volts
  Pz: { type: Number, required: true }, // Zener diode power rating in watts
  Izk: { type: Number, required: true }, // Zener knee current in amps
  Vf: { type: Number, required: true }, // Forward voltage drop in volts
  manufacturer: { type: String, required: true },
  description: { type: String },
  package: { type: String },
  temperatureRange: { type: String },
  datasheet: { type: String },
});

const zener = mongoose.model("zenerdiodes", zenerSchema);

module.exports = zener;
