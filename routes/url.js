const express = require("express");
const { handleGenerateNewShortURL, handleRedirect, handleGetAnalytics } = require("../controllers/url")
const router = express.Router();

router
    .post("/", handleGenerateNewShortURL)
    .get("/analytics/:shortId", handleGetAnalytics)
    .get("/:shortId", handleRedirect)


module.exports = router

///doubt :-{router} 
/*The statement module.exports = {router} is incorrect because it attempts to export an object with a property named router, but the variable router itself is not defined within the scope of the module. */