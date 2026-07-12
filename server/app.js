const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use("/api/files", fileRoutes);
app.use("/api/user", userRoutes);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;