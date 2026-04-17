const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  quoteText: String,
});

module.exports = mongoose.model("Quote", quoteSchema);