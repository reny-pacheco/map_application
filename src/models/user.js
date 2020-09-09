const mongoose = require('mongoose')
const validator = require('validator')
const bcrpyt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config();

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
        maxlength: [30, 'Firstname should 30 characters only'],
        trim: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error('Username must contain letters only')
            }
        },
        
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        maxlength: [30, 'Lastname should 30 characters only'],
        trim: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error('Lastname must contain letters only')
            }
            if (value === undefined) {
                throw new Error('Lastname is required')
            }
        }
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password should contain at least 8 characters'],
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrpyt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
        const auth = await bcrpyt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw new  Error('Unable to login')
    }
    throw new  Error('Unable to login')
}

// hashing password before saving to the database
userSchema.pre('save', async function (next) {
    const salt = await bcrpyt.genSalt()
    this.password = await bcrpyt.hash(this.password, salt)
    next()
})

//data ristrictions returned by database
userSchema.methods.getProfile = function() {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.email

    return userObject
}

// creating token for every user
userSchema.methods.createToken = async function() {
    const token = jwt.sign({_id : this._id.toString()}, process.env.JWT_SECRET)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User