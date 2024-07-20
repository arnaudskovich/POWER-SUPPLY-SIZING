const mongoose = require("mongoose");
const { Schema } = mongoose;

const capacitorSchema = new Schema({
  capacity: {
    type: Number,
    required: true,
  },
  voltage: {
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

const Capacitor = mongoose.model("Capacitor", capacitorSchema);

module.exports = Capacitor;
