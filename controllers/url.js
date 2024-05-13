const shortid = require("shortid")
const URL = require("../models/url")

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "url is required" })
    }
    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.status(200).json({ id: shortID })
}

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() },
        }
    })
    return res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics, handleRedirect }