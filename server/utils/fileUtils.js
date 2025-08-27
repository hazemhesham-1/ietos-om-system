const fs = require("fs");
const path = require("path");
const writtenNumber = require("written-number");

function readFile(fileName) {
    const dataPath = path.join(__dirname, "../data", fileName);
    const parsedJson = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    return parsedJson;
}

function capitalizeText(str) {
    const wordList = str.split(" ");
    const capitalizedWords = wordList.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(" ");
}

function convertNumberToText(num, lang) {
    return capitalizeText(writtenNumber(num, { lang }));
}

function parseJson(jsonString) {
    try {
        const parsedJson = JSON.parse(jsonString);
        return parsedJson;
    }
    catch(e) {
        return null;
    }
}

module.exports = { capitalizeText, convertNumberToText, readFile, parseJson };