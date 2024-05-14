const { getUser } = require("../services/auth");


async function restrictToLoggedinUserOnly(req, res, next) {
    const userUId = req.cookies?.uid;

    if (!userUId) return res.redirect("/login")
    const user = getUser(userUId)

    if (!user) return res.redirect("/login")
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    //for home page display only users url not all urls
    const userUId = req.cookies?.uid;

    const user = getUser(userUId)
    req.user = user;
    next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth }