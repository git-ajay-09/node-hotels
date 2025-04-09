const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person')
const Menu = require('./models/menu')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
require('dotenv').config();
const passport = require('./auth')
const bcrypt = require('bcrypt')



const logrequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to ${req.originalUrl}`)
    next();
}


app.use(passport.initialize())
const localauthmiddleware = passport.authenticate('local', {session : false})

app.use(logrequest); //to use middleware all over the urls


app.get('/',(req, res) => {
    res.send('welcome to our hotel, how i can i help u?')
})

app.use('/person',localauthmiddleware, personRoutes) //when you want to apply middleware on a specific routes
app.use('/menu', menuRoutes)
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`server is running on portal ${PORT}`)
})
