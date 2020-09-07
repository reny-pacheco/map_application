const User = require('../models/user')

module.exports.login_get = (req,res) => {
    res.render('login')
}

module.exports.login_post = async (req,res) => {
   
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = await user.createToken()
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })

        res.status(200).render('home', {user : user})
    } catch (err) {
        res.status(400).send('Email or password incorrect')
    }

}

module.exports.signup_get = (req,res) => {
    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    const user  = new User(req.body)
    try {
        await user.save()
        const token = await user.createToken()

        res.status(201).render('login')
    } catch (err) {
        res.status(400).send('Please provide the correct data on each field')
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '',{ maxAge: 1})
    res.redirect('/login')

}