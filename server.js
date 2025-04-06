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


const logrequest =(req, res, next) =>{
    console.log(`${new Date().toISOString()} Request Made to ${req.url}`)
    next();
}

app.get('/', logrequest, (req, res) => {
    res.send('welcome to our hotel, how i can i help u?')
})

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`server is running on portal ${PORT}`)
})
