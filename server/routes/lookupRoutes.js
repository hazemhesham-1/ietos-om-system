const express = require("express");

const dataController = require("../controllers/staticDataController");
const equipmentController = require("../controllers/equipmentController");
const equipmentFieldController = require("../controllers/equipmentFieldController");
const operationsController = require("../controllers/operationsController");
const router = express.Router();

router.get("/governorates", dataController.getGovernorates);
router.get("/currencies", dataController.getCurrencies);
router.get("/treatment-types", dataController.getTreatmentPlants);

router.get("/operations", operationsController.getOperations);
router.get("/equipment", equipmentController.getAllEquipment);
router.get("/equipment-fields", equipmentFieldController.getAllFields);

module.exports = router;