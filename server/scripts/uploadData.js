async function uploadData(Model, data) {
    try {
        const result = await Model.insertMany(data);
        console.log(`${result.length} documents inserted`);
    }
    catch(err) {
        console.error("Error uploading data: ", err.message);
    }
}

module.exports = { uploadData };