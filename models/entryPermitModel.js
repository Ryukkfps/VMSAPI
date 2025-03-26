const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid"); // For generating unique passcodes

const entryPermitSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  TimeSpan: {
    type: Number,
    required: true,
    description: "Validity period in hours",
  },
  DateTime: {
    type: Date,
    required: true,
  },
  PassCode: {
    type: String,
    default: () => Math.floor(100000 + Math.random() * 900000).toString(), // Generate a 6-digit numeric passcode
    unique: true,
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the EntryPermit model
const EntryPermit = mongoose.model("EntryPermit", entryPermitSchema);

module.exports = EntryPermit;
