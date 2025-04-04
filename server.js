const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person')
const Menu = require('./models/menu')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')


app.get('/', (req, res) => {
    res.send('welcome to our hotel, how i can i help u?')
})

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)



app.listen(3000, () => {
    console.log('server is running on portal 3000')
})
