const { getUser } = require("../services/auth");

function checkForAuthentication(res, req, next) {
    const authorizationHeaderValue = req.headersreq.headers["authorization"];
    req.user = null;
    if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) {
        return next()
    }
    const token = authorizationHeaderValue.split(" ")[1]
    const user = getUser(token)
    req.user = user;
    return next();
}

function restrictTo(roles = []) {

    return function (req, res, next) {
        console.log("restrict t1o===>")
        if (!req.user) return res.redirect("/login");
        console.log("restrict to===>")
        if (!roles.includes(req.user.role)) {
            return res.end("UnAuthorized")
        }

        return next();
    }

}


module.exports = { checkForAuthentication, restrictTo }