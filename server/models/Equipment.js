const mongoose = require("mongoose");
const LocalizedLabel = require("./shared/LocalizedLabel");

const EquipmentSchema = new mongoose.Schema({
    label: { type: LocalizedLabel, required: true },
    category: { type: String, required: true },
    value: { type: String, required: true, unique: true },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Equipment", EquipmentSchema, "equipment");