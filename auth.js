const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy; //username and passport strategy
const Person = require('./models/person')

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await Person.findOne({ username: username })
        if (!user) return done(null, false, { messaege: 'Incorrect Username' })
        
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return done(null, false, {message : 'Incorrect Password'});
        }
    } catch (err) {
        return done(err)
    }
}))

module.exports = passport;