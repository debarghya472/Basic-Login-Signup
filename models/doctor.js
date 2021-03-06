const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  time: {
    from: {
      type: Number,
    },
    to: {
      type: Number,
    },
  },
  field: {
    type: String,
  },
  availableDays: {
    type: String,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
