const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

router.post('/create-user', async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    let newUser = new User({
        username: req.body.username,
        password: hashPass,
        isAdmin: req.body.isAdmin
    });
    await newUser.save()
    .then((response)=>{
        res.send(response);
    }).catch(err => res.status(500).send(err));
  
});

router.post('/login', async (req,res)=>{
    await User.findOne({username: req.body.username}).then(result =>
        res.json(result.password)).catch( err => res.status(400).send(err));


    // let validPass = await bcrypt.compare(req.body.password, user.password);
    // if(!validPass) res.status(500).send('Password is incorrect');

    // create token

    // const token = jwt.sign({__id: user.__id}, process.env.ACCESS_TOKEN);
    // res.header('auth-token', token).send(token);
});

router.get('/user', async (req,res)=> {
    await User.find().then(result => res.json(result))
    .catch(err => res.status(500).send(err));
});

router.delete('/delete-user/:user', async (req, res)=> {
    await User.deleteOne({username: req.params.user}).then(result => res.json("Deleted"))
    .catch(err => res.status(500).send(err));
})

module.exports = router;