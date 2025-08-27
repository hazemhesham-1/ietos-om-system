const mongoose = require("mongoose");

const LocalizedLabelSchema = new mongoose.Schema({
    ar: { type: String, required: true },
    en: { type: String, required: true },
}, { _id: false, versionKey: false });

module.exports = LocalizedLabelSchema;