const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const CreatedSchema = new Schema({
  createdBy: {
    type: String,
    required: true
  },
  videoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "metadatas"
  },
  date: {
    type: Date,
    default: Date.now
  },
});
module.exports = Created = mongoose.model("creates", CreatedSchema);