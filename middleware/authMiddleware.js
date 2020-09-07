const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    console.log(token)
    // check if there is token
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

module.exports = requireAuth 