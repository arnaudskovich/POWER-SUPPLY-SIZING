const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResistorSchema = new Schema({
  resistance: {
    type: Number,
    required: true,
  },
  tolerance: {
    type: Number,
    required: true,
  },
  serie: {
    type: String,
    required: true,
  },
});

const Resistor = mongoose.model("Resistor", ResistorSchema);

module.exports = Resistor;
