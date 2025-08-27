const { readFile } = require("../utils/fileUtils");

const WorkItem = require("../models/WorkItem");

async function getOperations(req, res) {
    try {
        const works = await WorkItem.find({});
        const schedules = readFile("schedules.json");
        const replacements = readFile("replacements.json");
        
        res.json({ works, schedules, replacements });
    }
    catch(err) {
        console.error("Error fetching Work Operations: ", err.message);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { getOperations };