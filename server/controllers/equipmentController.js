const { readFile } = require("../utils/fileUtils");
const Equipment = require("../models/Equipment");

async function getAllEquipment(req, res) {
    try {
        const equipment = await Equipment.find();
        const categories = readFile("categories.json");

        res.status(200).json({ equipment, categories });
    }
    catch(err) {
        console.error("Error fetching Treatment Equipment: ", err.message);
        res.status(500).json({ error: "Server error", error: err });
    }
}

module.exports = { getAllEquipment };