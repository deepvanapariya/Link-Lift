const express = require("express");
const urlRoutes = require("./routes/url");
const { connectToMongoDb } = require("./connnection")
const URL = require('./models/url')
const app = express();
const PORT = 8080;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("db connnected"))

app.use(express.json())
app.use("/url", urlRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))