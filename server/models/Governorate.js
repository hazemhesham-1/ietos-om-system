const mongoose = require("mongoose");

const governorateSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Governorate", governorateSchema);