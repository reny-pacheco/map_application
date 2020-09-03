const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')

require('./db/mongoose')
const authRoutes = require('./routes/authRoutes')

dotenv.config();

const PORT = process.env.PORT || 3000

//middleware
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

//view-engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.use(authRoutes)


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})