const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    rate: { type: Number, required: true },
    imgLink: { type: String, required: true },
    id_user: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

module.exports = model("Product", productSchema);
