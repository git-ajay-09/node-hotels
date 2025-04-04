const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true,
        default : 100
    },
    taste :{
        type : String,
        enum :['Spicy','Sour','Sweet'],
        required : false
    },
    ingredients : {
        type : [String],
    },
    id_drink :{
        type : Boolean,
        default : false
    },
    sales :{
        type :Number,
        default : 0
    }
})

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu;