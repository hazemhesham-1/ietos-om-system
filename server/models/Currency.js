const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    value: { type: String, required: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Currency", currencySchema);