const { capitalizeText, convertNumberToText, parseJson } = require("../utils/fileUtils");
const WorkItem = require("../models/WorkItem");
const Equipment = require("../models/Equipment");
const EquipmentField = require("../models/EquipmentField");

async function buildProposalContent(data) {
    const { language: lang, documentCode } = data;

    const projectGovernorate = parseJson(data.projectGovernorate);
    const plantType = parseJson(data.plantType);
    const currency = parseJson(data.currency);

    const operationsData = {
        tasks: { list: [], isIncluded: false },
        manpower: { list: [], isIncluded: false },
        chemicalManagement: { list: [], isIncluded: false },
        operationSchedule: {},
        replacements: {},
        reports: { list: [], isIncluded: false },
        excludedTasks: { list: [], isIncluded: false },
    };

    const financialData = {};
    
    if(documentCode === "REH") {
        const equipment = await Equipment.find({});
        const specifications = await EquipmentField.find({});

        const installationTasks = [];
        let totalCost = 0;
        let index = 1;

        for(let item of data.equipment) {
            const data = getEquipmentData(item, { equipment, specifications }, lang);
            totalCost += data.totalPrice;
            installationTasks.push({ ...data, index });
            ++index;
        }

        operationsData.tasks = installationTasks;
        financialData.totalCost = totalCost;
        financialData.totalCostText = `${convertNumberToText(totalCost, lang)} ${currency.name[lang]}`;
    }
    else {
        const workOperations = await WorkItem.find({});

        const {
            workValue: monthlyAmount,
            operationScope: selectedTasks
        } = data;

        operationsData.tasks = transformItems(workOperations, selectedTasks, lang);
        operationsData.manpower = transformItems(workOperations, data.manpower, lang);
        operationsData.chemicalManagement = transformItems(workOperations, data.chemicalManagement, lang);
        operationsData.operationSchedule = transformItems(workOperations, data.operationSchedule, lang, true);
        operationsData.replacements = transformItems(workOperations, data.replacements, lang, true);

        operationsData.reports.list = data.reports.map((item) => ({ value: item.value })) || [];
        operationsData.reports.isIncluded = data?.reports?.length > 0;

        const operationItems = workOperations.filter((work) => work.type === "operations");
        operationsData.excludedTasks = transformItems(operationItems, selectedTasks, lang, false, false);
        
        const totalMonthlyAmount = Math.round(monthlyAmount * 1.14);
        const totalAnnualAmount = Math.round(monthlyAmount * 1.14 * 12);

        financialData.monthlyAmount = monthlyAmount;
        financialData.monthlyAmountText = `${convertNumberToText(monthlyAmount, lang)} ${currency.name[lang]}`;
        financialData.monthlyTax = (monthlyAmount * 0.14).toFixed(1);
        financialData.totalMonthlyAmountValue = totalMonthlyAmount;
        financialData.totalMonthlyAmountText = `${convertNumberToText(totalMonthlyAmount, lang)} ${currency.name[lang]}`;
        financialData.annualAmount = monthlyAmount * 12;
        financialData.annualAmountText = `${convertNumberToText(monthlyAmount * 12, lang)} ${currency.name[lang]}`;
        financialData.annualTax = (monthlyAmount * 12 * 0.14).toFixed(1);
        financialData.totalAnnualAmountValue = totalAnnualAmount;
        financialData.totalAnnualAmountText = `${convertNumberToText(totalAnnualAmount, lang)} ${currency.name[lang]}`;
    }

    const proposalContent = {
        ...data,
        issueDateString: new Date(data.issueDate).toLocaleString(lang === "ar" ? "ar-EG" : "en-US", { month: "long", year: "numeric" }),
        projectGovernorate: projectGovernorate?.name[lang],
        plantType: plantType?.name[lang],
        plantTypeShort: plantType?.value,
        treatmentType: plantType?.treatment[lang],
        workScope: operationsData,
        finance: {
            ...financialData,
            currency: currency.name[lang],
            currencyISO: currency.value,
        }
    };

    return proposalContent;
}

function getOptionLabel(options, key, value) {
    const matchedOptions = options.find((option) => option.key === key)?.options;
    const labels = matchedOptions.find((option) => option.value === value)?.label;
    return labels;
}

function transformItems(sourceItems, targetIds, language = "en", groupByType = false, includeMatched = true) {
    const filteredItems = sourceItems.filter(({ _id }) => targetIds.includes(_id.toString()) === includeMatched);

    if(groupByType) {
        const groupedResult = {};
        for(const item of filteredItems) {
            if(!groupedResult[item.type]) {
                groupedResult[item.type] = { list: [], isIncluded: false };
            }
            groupedResult[item.type].list.push({ value: item.label[language] });
            groupedResult[item.type].isIncluded = true;
        }
        return groupedResult;
    }

    const result = {
        list: [],
        isIncluded: false,
    };

    result.list = filteredItems.map((item) => ({ value: item.label[language] }));
    result.isIncluded = filteredItems.length > 0;

    return result;
}

function getEquipmentData(item, resources, lang = "en") {
    const { unit, quantity } = item;
    const { equipment, specifications } = resources;

    const actionLabel = JSON.parse(item.actionType)?.[lang];
    const itemLabel = equipment.find(({ value }) => value === item.equipment)?.label[lang];

    const processedItem = {};
    if(lang === "ar") {
        const supplyItem = `${item.type ? item.type : itemLabel}${item.location ? ` في ${item.location}` : ""}`;
        processedItem.task = `${actionLabel} ${supplyItem}`;
        processedItem.item = supplyItem;
        processedItem.unit = getOptionLabel(specifications, "unit", unit)[lang];
    }
    else if(lang === "en") {
        let supplyItem = `${item.type ? capitalizeText(item.type) : itemLabel}`;
        supplyItem += `${item.location ? ` at ${capitalizeText(item.location)}` : ""}`;
        processedItem.task = `${actionLabel} of ${supplyItem}`;
        processedItem.item = supplyItem;
        processedItem.unit = unit;
    }
    
    const casingMaterial = getOptionLabel(specifications, "casingMaterial", item?.casingMaterial)?.en;
    const impellerMaterial = getOptionLabel(specifications, "impellerMaterial", item?.impellerMaterial)?.en;
    const shaftMaterial = getOptionLabel(specifications, "shaftMaterial", item?.shaftMaterial)?.en;
    const protection = getOptionLabel(specifications, "protection", item?.protection)?.en;

    const itemDetails = {
        ...item,
        quantity,
        casingMaterial,
        impellerMaterial,
        shaftMaterial,
        protection,
    };

    const itemData = {
        ...processedItem,
        specifications: getSpecifications(itemDetails),
        quantity,
        price: item.price,
        totalPrice: unit !== "LS" ? Number(item.price) * item.quantity : Number(item.price),
    };
    
    return itemData;
}

function getSpecifications(item) {
    const specifications = [];
    const parameters = {
        quantity: "Quantity\t\t:\t{value}",
        type: "Type\t\t\t:\t{value}",
        flow: "Flow\t\t\t:\t{value} m3/Hr.",
        head: "Head\t\t\t:\t{value} m",
        headPressure: "Head\t\t\t:\t{value} mBar",
        casingMaterial: "Casing Material\t\t:\t{value}",
        shaftMaterial: "Shaft Material\t\t:\t{value}",
        impellerMaterial: "Impeller Material\t:\t{value}",
        valves: "Valves\t\t\t:\t{value}",
        size: "Size\t\t\t:\t{value}\"",
        diameter: "Filter Diameter\t\t:\t{value} mm",
        height: "Effective Height\t\t:\t{value} mm",
        protection: "Protection\t\t:\t{value}",
        manufacturer: "Manufacturer\t\t:\t{value}",
        origin: "Origin\t\t\t:\t{value}"
    };

    for(const key in parameters) {
        if((key in item) && (item[key] !== undefined)) {
            const value = parameters[key].replace("{value}", item[key]);
            specifications.push({ value });
        }
    }

    return specifications;
}

module.exports = buildProposalContent;