const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express());

app.use("/", (req, res) => {
  res.json("NoteHive API running");
});

module.exports = app;
