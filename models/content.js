const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentScheme = new Schema({
    title: String,
    identifikator: String,
    text: String
});
module.exports = mongoose.model("Content", contentScheme);
