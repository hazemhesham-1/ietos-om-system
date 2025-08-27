const mongoose = require("mongoose");
const { VISIT_STATUSES } = require("../config/constants");

const { Schema } = mongoose;

const siteVisitSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    siteName: { type: String, required: true },
    siteLocation: { lat: Number, long: Number },
    scheduledDate: { type: Date, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    status: { type: String, enum: VISIT_STATUSES, default: "pending" },
    duration: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model("SiteVisit", siteVisitSchema);