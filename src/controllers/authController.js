const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { firstname: '' ,lastname: '', email: '', password: ''}

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'Email is already registered'
        return errors
    }

    // check for errors
    if (err.message.includes('User validation failed')) {
       Object.values(err.errors).forEach(properties => {
           errors[properties.path] = properties.message
       })
    }
    if (err.message.includes('Unable to login')) {
        errors = 'Email or password is incorrect'
    
    }
    return errors
}

module.exports.login_get = (req,res) => {
    res.render('login')
}

module.exports.login_post = async (req,res) => {
   
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = await user.createToken()
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })

        res.status(200).json({user: user})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
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

        res.status(201).send({user: user.id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '',{ maxAge: 1})
    res.redirect('/login')

}