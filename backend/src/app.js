const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("../src/middlewares/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);
module.exports = app;
