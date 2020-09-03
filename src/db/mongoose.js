const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const MONGOOSE_URI = process.env.MONGOOSE_URI

mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})