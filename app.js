// MongoDB
const mongoose = require('mongoose');

// Cors
const cors = require('cors');

// DotEnv
require('dotenv').config();
const uri = process.env.ATLAS_URI;

// Express
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// bcrypt
const bcrypt = require('bcrypt');

// Flash
const flash = require('express-flash');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);


// static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/styles'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/images'));

// mongoose connection
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB databse connection established!");
});

// view engine
app.set('view engine', 'ejs');

// User database
const User = require('./models/user.model');

// Passport
const passport = require('passport');
const initializePassport = require('./passport-config');
initializePassport(passport, async (username)=> {
    await User.findOne({username : username});
    await User.findById(user.__id);
})

// Flash & Session
app.use(flash());
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
//    store: new MongoStore({moongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) =>{
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: 'orders',
    failureRedirect: '/',
    failureFlash: true
}));

app.get('/about', checkAuth,(req,res) =>{
    res.render('about');
});

app.get('/drivers', checkAuth,(req,res) =>{
    res.render('drivers');
});

app.get('/orders', checkAuth,(req,res) =>{
    res.render('orders');
});

app.get('/success', (req,res)=>{
    res.render('success');
});


const requestRouter = require('./routes/request');
const userRouter = require('./routes/auth');
const { static } = require('express');

app.use('/api/request', requestRouter);
app.use('/api/auth',userRouter);

app.listen(port, (err)=>{
    if(err) throw err
    console.log(`Server is running on port: ${port}`)
});

function checkAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}

// function checkNotAuth(res, req, next){
//     if(req.isAuthenticated()){
//         res.redirect('orders')
//     }

//     next();
// }



