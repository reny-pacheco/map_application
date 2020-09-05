const User = require('../models/user')

module.exports.login_get = (req,res) => {
    res.render('login')
}

module.exports.login_post = (req,res) => {
    // const user = req.body
    // console.log(user.email)
    res.send('Under development')
}

module.exports.signup_get = (req,res) => {
    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    const user  = new User(req.body)
    try {
        await user.save()
        res.status(201).render('login')
    } catch (err) {
        res.status(400).send(err)
    }
}