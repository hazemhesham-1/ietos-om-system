const express = require("express");
const multer = require("multer");
const router = express.Router();

const documentController = require("../controllers/documentController");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", documentController.getAllProposals);
router.get("/download/:key", documentController.downloadDocument);
router.post("/generate", documentController.generateDocx);
router.post("/submit", upload.single("document"), documentController.submitDocument);
router.post("/upload", upload.single("document"), documentController.uploadDocument);
router.patch("/:id", documentController.updateProposalById);

module.exports = router;