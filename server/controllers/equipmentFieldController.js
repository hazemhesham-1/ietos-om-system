const EquipmentField = require("../models/EquipmentField");

async function getAllFields(req, res) {
    try {
        const fields = await EquipmentField.find();
        res.status(200).json(fields);
    }
    catch(err) {
        console.error("Error fetching Equipment Fields: ", err.message);
        res.status(500).json({ error: "Server error", error: err });
    }
}

module.exports = { getAllFields };