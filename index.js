const express = require("express");
const path = require("path")
const urlRoutes = require("./routes/url");
const { connectToMongoDb } = require("./connnection")
const URL = require('./models/url')
const staticRoutes = require("./routes/ststicRouter")
const app = express();
const PORT = 8080;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("db connnected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/url", urlRoutes);
app.use("/", staticRoutes)

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({})
    return res.render("home", { urls: allUrls })
})

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))