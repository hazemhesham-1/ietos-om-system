const express = require("express");
const router = express.Router();

const siteVisitController = require("../controllers/siteVisitController");

router.get("/", siteVisitController.getFilteredSiteVisits);
router.post("/", siteVisitController.createSiteVisit);
router.patch("/:id", siteVisitController.updateSiteVisitById);

module.exports = router;