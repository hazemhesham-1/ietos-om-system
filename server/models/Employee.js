const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ROLES } = require("../config/constants");

const employeeSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, enum: Object.values(ROLES), required: true },
    profilePhoto: { type: String, default: null },
    refreshToken: [String],
}, { versionKey: false });

employeeSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

employeeSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("Employee", employeeSchema);