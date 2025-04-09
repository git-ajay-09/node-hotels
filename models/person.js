const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number
    },
    username :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

personSchema.pre('save', async function(next){
    const person = this;
    if(!person.isModified('password')) return next();

    try{
        //generate the salt which will be added into hashed password
        const salt = await bcrypt.genSalt(10);
        //hashed only the password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        //overide the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the given password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}
//create person model
const Person = mongoose.model('Person', personSchema)
module.exports = Person;