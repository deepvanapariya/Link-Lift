const User = require("../models/user");
const { v4: uuidV4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password })
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    if (!user) {
        return res.render('login', { error: "Invalid UserName or Password" })
    }
    const token = setUser(user)
    res.cookie("token", token)
    /*we can add specific domain here for cookie security,expire date
    {domain:".deep.com"} any sub domain www.deep.com , blog.deep.com like gmail account
    {domain:"deep.com"} only deep.com
    */
    return res.redirect("/")
}

module.exports = { handleUserSignup, handleUserLogin }