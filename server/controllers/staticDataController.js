const Currency = require("../models/Currency");
const Governorate = require("../models/Governorate");
const TreatmentPlant = require("../models/TreatmentPlant");

async function getCurrencies(req, res) {
    try {
        const currencies = await Currency.find().sort({ "name.en": 1 });
        res.json(currencies);
    }
    catch(err) {
        console.error("Error fetching data: ", err.message);
        res.status(500).json({ error: "Server error" });
    }
}

async function getGovernorates(req, res) {
    try {
        const governorates = await Governorate.find().sort({ "name.en": 1 });
        res.json(governorates);
    }
    catch(err) {
        console.error("Error fetching data: ", err.message);
        res.status(500).json({ error: "Server error" });
    }
}

async function getTreatmentPlants(req, res) {
    try {
        const treatmentPlants = await TreatmentPlant.find();
        res.json(treatmentPlants);
    }
    catch(err) {
        console.error("Error fetching data: ", err.message);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { getCurrencies, getGovernorates, getTreatmentPlants };