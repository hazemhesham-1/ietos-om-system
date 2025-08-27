const Employee = require("../models/Employee");

async function getAllEmployees(req, res) {
    try {
        const employees = await Employee.find().select("-password -refreshToken");
        if(!employees) {
            return res.status(204).json({ message: "No employees were found" });
        }

        res.status(200).json(employees);
    }
    catch(err) {
        console.error("Error fetching employees: ", err.message);
        res.status(500).json({ error: "Server error", error: err });
    }
}

async function getEmployeeById(req, res) {
    try {
        const employeeId = req.user.id;

        const employee = await Employee.findById(employeeId).select("-password -refreshToken");
        if(!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(employee);
    }
    catch(err) {
        console.error("Error fetching employee data: ", err.message);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { getAllEmployees, getEmployeeById };