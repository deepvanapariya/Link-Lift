const express = require("express");
const path = require("path")
const { connectToMongoDb } = require("./connnection")
const URL = require('./models/url')
const cookieParser = require("cookie-parser")

const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/ststicRouter")
const userRoutes = require('./routes/user');
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const app = express();
const PORT = 8080;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("db connnected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
app.use("/user", userRoutes)
app.use("/", staticRoutes)


app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))