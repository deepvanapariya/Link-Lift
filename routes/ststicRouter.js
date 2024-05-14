const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");
const router = express.Router();


router.get("/", restrictTo(["NORMAL"]), async (req, res) => {

    const allurls = await URL.find({ createdBy: req.user._id })
    return res.render("home", { urls: allurls });
})

router
    .get("/signup", (req, res) => {
        return res.render("signup")
    })
    .get("/login", (req, res) => {
        console.log("static router login==>")
        return res.render("login")
    })

module.exports = router