const mongoose = require("mongoose");
const LocalizedLabel = require("./shared/LocalizedLabel");

const WorkItemSchema = new mongoose.Schema({
    label: { type: LocalizedLabel, required: true },
    type: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model("WorkItem", WorkItemSchema);