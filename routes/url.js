const express = require("express");
const { handleGenerateNewShortURL, handleRedirect, handleGetAnalytics } = require("../controllers/url")
const router = express.Router();

router
    .post("/", handleGenerateNewShortURL)
    .get("/analytics/:shortId", handleGetAnalytics)
    .get("/:shortId", handleRedirect)


module.exports = router

///doubt :-{router}