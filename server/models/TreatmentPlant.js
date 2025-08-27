const mongoose = require("mongoose");
const LocalizedLabelSchema = require("./shared/LocalizedLabel");

const TreatmentPlantSchema = new mongoose.Schema({
    name: { type: LocalizedLabelSchema, required: true },
    treatment: { type: LocalizedLabelSchema, required: true },
    value: { type: String, required: true, unique: true }
}, { versionKey: false });

module.exports = mongoose.model("TreatmentPlant", TreatmentPlantSchema);