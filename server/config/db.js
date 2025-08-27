require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch(err) {
        console.error("Database connection failed: ", err.message);
        process.exit(1);
    }
}

mongoose.connection.once("open", () => {
    console.log("Database connection established (Mongoose)");
});

mongoose.connection.on("error", (err) => {
    console.error("Database connection failed: ", err.message);
});

module.exports = connectDB;