const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/authenticate");

const authRoute = require("./routes/authRoutes");
const lookupRoutes = require("./routes/lookupRoutes");
const documentRoutes = require("./routes/documentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const userRoutes = require("./routes/userRoutes");
const siteVisitRoutes = require("./routes/siteVisitRoutes");

const app = express();

connectDB();

app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use(authenticate);

app.use("/api", lookupRoutes);
app.use("/api/proposals", documentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/site-visits", siteVisitRoutes);
app.use("/api/user", userRoutes);

app.listen(3001, () => console.log("Server is running on port 3001"));