const fs = require("fs");
const path = require("path");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const { DOMParser } = require("@xmldom/xmldom");

const Proposal = require("../models/Proposal");

const buildProposalContent = require("../helpers/buildProposalContent");
const { uploadToBucket, generatePresignedUrl } = require("../services/s3Service");

async function generateDocx(req, res) {
    const formData = req.body;
    if(!formData) {
        return res.status(400).json({ error: "Missing required form data" });
    }

    const documentContent = await buildProposalContent(formData);

    const templatePath = path.resolve(__dirname, `../templates/${formData.documentCode}`, `template-${formData.language}.docx`);
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const document = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        parser: (tag) => ({ get: (s) => s[tag] }),
        xmlParser: (xml) => new DOMParser().parseFromString(xml, "text/xml")
    });
    
    try {
        document.render(documentContent);
    }
    catch(err) {
        return res.status(500).send(`Error rendering docx: ${err.message}`);
    }

    const buffer = document.getZip().generate({ type: "nodebuffer" });

    res.set({
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=${formData.id}.docx`,
    });
    res.send(buffer);
}

async function submitDocument(req, res) {
    const formData = req.body;
    const file = req.file;

    if(!formData) {
        return res.status(400).json({ error: "Missing required form data" });
    }

    const { language: lang } = formData;
    const governorate = JSON.parse(formData.projectGovernorate).name[lang];
    const plantType = JSON.parse(formData.plantType).value;
    const currency = JSON.parse(formData.currency).value;

    try {
        const { filename, url } = await uploadToBucket(file);

        const payload = {
            id: formData.id,
            title: formData.projectSubject,
            employee: formData.employeeId,
            site: `${formData.projectLocation} - ${governorate}`,
            plantType,
            flowrate: Number(formData.flowrate),
            estimatedCost: Number(formData.workValue),
            currency,
            contractDuration: Number(formData.contractDuration),
            attachments: [{ filename, url }]
        };
        
        const proposal = await Proposal(payload);
        const savedProposal = await proposal.save();
        res.status(201).json(savedProposal);
    }
    catch(err) {
        res.status(400).json({ error: err.message });
    }
}

async function uploadDocument(req, res) {
    try {
        const file = req.file;

        if(!file) {
            return res.status(400).json({ error: "No file uploaded." });
        }
        if(file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return res.status(400).json({ error: "Only .docx files are allowed." });
        }

        const { filename, url } = await uploadToBucket(file);
        return res.status(200).json({ message: "Upload successful", filename, url });
    }
    catch(err) {
        console.error("Upload error: ", err);
        return res.status(500).json({ error: "Upload failed" });
    }
}

async function downloadDocument(req, res) {
    try {
        const fileKey = req.params.key;
        const url = await generatePresignedUrl(fileKey);
        res.json({ url });
    }
    catch (err) {
        console.error("Error generating pre-signed URL: ", err);
        res.status(500).send({ error: "Server Error", error: err });
    }
}

async function getAllProposals(req, res) {
    try {
        const proposals = await Proposal.find().populate("employeeId", "-password -refreshToken");
        if(!proposals) {
            return res.status(204).json({ message: "No technical proposals were found" });
        }

        res.status(200).json(proposals);
    }
    catch(err) {
        console.error("Error fetching technical proposals: ", err.message);
        res.status(500).json({ error: "Server error", error: err });
    }
}

async function updateProposalById(req, res) {
    try {
        const { id } = req.params;
        const result = await Proposal.findByIdAndUpdate(id, req.body, { new: true });
        if(!result) {
            return res.status(404).json({ error: "Technical Proposal does not exist." });
        }

        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    generateDocx,
    submitDocument,
    uploadDocument,
    downloadDocument,
    getAllProposals,
    updateProposalById
};