const ROLES = {
    ADMIN: 1000,
    MANAGER: 2000,
    TECHNICIAN: 3000
};

const VISIT_STATUSES = [
    "pending",
    "on_site",
    "completed",
    "missed"
];

module.exports = { ROLES, VISIT_STATUSES };