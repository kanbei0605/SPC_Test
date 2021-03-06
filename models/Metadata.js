const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const MetadataSchema = new Schema({
  videoSize: {
    type: Number,
    required: true
  },
  viewerCount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});
module.exports = Metadata = mongoose.model("metadatas", MetadataSchema);