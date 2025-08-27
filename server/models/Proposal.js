const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    site: { type: String, required: true, minlength: 3 },
    plantType: { type: String, enum: ["WWTP", "IWWTP", "DWTP", "STP"], required: true },
    flowrate: { type: Number, required: true, min: 0 },
    estimatedCost: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "EGP" },
    contractDuration: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ["pending", "approved", "rejected", "revise"], default: "pending" },
    attachments: [{ filename: String, url: String }],
    comments: { type: String, default: "" }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Proposal", proposalSchema);