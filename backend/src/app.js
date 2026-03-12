const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("../src/middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const limiter = require("./middlewares/rateLimiter");

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorHandler);
module.exports = app;
