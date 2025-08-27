const mongoose = require("mongoose");
const LocalizedLabel = require("./shared/LocalizedLabel");

const EquipmentFieldSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ["text", "number", "select", "date"] },
    options: {
        type: [{
            label: { type: LocalizedLabel, required: true },
            value: { type: String, required: true }
        }],
        required: false,
        default: undefined
    }
}, { versionKey: false, timestamps: false });

module.exports = mongoose.model("EquipmentField", EquipmentFieldSchema);