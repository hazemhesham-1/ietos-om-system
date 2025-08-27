const SiteVisit = require("../models/SiteVisit");

async function getFilteredSiteVisits(req, res) {
    try {
        const { employeeId, date } = req.query;
        const filters = {};

        if(employeeId) {
            filters.employeeId = employeeId;
        }

        if(date) {
            const visitDate = new Date(date);
            const nextDay = new Date(visitDate);
            nextDay.setDate(visitDate.getDate() + 1);
            filters.scheduledDate = { $gte: visitDate, $lt: nextDay };
        }

        const visits = await SiteVisit.find(filters).populate("employeeId", "-password -refreshToken");
        res.json(visits);
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}

async function createSiteVisit(req, res) {
    try {
        const currentDate = new Date();
        req.body.scheduledDate = currentDate.toISOString().split("T")[0];
        req.body.startTime = currentDate.toISOString().split(" ")[0];

        const newVisit = new SiteVisit(req.body);
        const result = await newVisit.save();
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function updateSiteVisitById(req, res) {
    try {
        const { id } = req.params;
        const result = await SiteVisit.findByIdAndUpdate(id, req.body, { new: true });
        if(!result) {
            return res.status(404).json({ error: "Site visit does not exist." });
        }

        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { getFilteredSiteVisits, createSiteVisit, updateSiteVisitById };