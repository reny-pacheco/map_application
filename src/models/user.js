const mongoose = require('mongoose')
const validator = require('validator')
const bcrpyt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error('Username must contain letters only')
            }
        }
        
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error('Lastname must contain letters only')
            }
        }
        
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }

    },
    email: {
        type: String,
        unique: true,
        require: true,
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

const User = mongoose.model('User', userSchema)

module.exports = User