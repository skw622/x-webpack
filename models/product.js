const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentScheme = new Schema({
    title: String,
    size: String,
    text: String,
    position: Number,
    status: Boolean,
    price_rub: String,
    price_usd: String,
    image: String
});
module.exports = mongoose.model("Product", contentScheme);
