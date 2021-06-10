const LocalStrategy = require('passport-local');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

function initialize(passport){
    const authenticateUser = async (username, password, done) => {
       const user = await User.findOne({username});
        if(user == null){
            return done(null, false, {message: 'Invalid Username'})
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else{
                return done(null, false, {message: "Invalid password"});
            }
        } catch (err) {
            return done(err)
        }

    }
        passport.use(new LocalStrategy({username: 'username'}, authenticateUser));

        passport.serializeUser((user, done)=>{
            done(null, user);
        });

        passport.deserializeUser((id, done) =>{
            User.findById(id, (err, user)=>{
                done(err, user);
            });
        });
}

module.exports = initialize;