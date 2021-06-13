const router = require('express').Router();
const passport = require('passport');
const Request = require('../models/request.model');
const Escort = require('../models/escort.model');
const Driver = require('../models/driver.model');


router.get('/about', checkAuth,(req,res) =>{
    res.render('about', {manage:false, isDel:true,branch: "", title:"About"});
});

router.get('/drivers', checkAuth, async (req,res) =>{
    await Driver.find()
    .then((drivers)=> {
        res.render('drivers', {manage:true, isDel: true,branch: "Drivers", title:"Drivers", data: drivers})
    })
    .catch( err=> res.status(500).json("Error"));
});

router.get('/deliver', checkAuth,(req,res) =>{
    res.render('deliver', {manage:false,isDel: true ,branch: "Deliveries", title:"Orders"});
});

router.get('/escort', checkAuth, (req,res)=>{
    res.render('escort', {manage:false,isDel:false, branch: "Escort", title:"Orders"});
});

router.get('/manage', checkAuth, checkRole, async (req,res)=>{
    await Request.find()
    .then(requests =>{
        res.render('manage', {manage:true, isDel:true ,branch: "Deliveries", title:"Orders", data: requests})
    })
    .catch(err => res.status(500).json("error" + err));
    
});

router.get('/manage_esc', checkAuth, async(req,res)=>{
    await Escort.find()
    .then(requests =>{
        res.render('manage_esc', {manage:true, isDel:false ,branch: "Escort", title:"Orders", data: requests})
    })
    .catch(err => res.status(500).json("error" + err));
    
});

router.get('/update_del', checkAuth, async (req,res)=>{
    const qid = req.query.id;
    console.log(qid);
    const request = await Request.findById(qid)
    res.render('update_del', {manage:true, isDel:true ,branch: "Deliveries", title:"Orders", request: request})
});

router.get('/update_esc', checkAuth, async (req,res)=>{
    const qid = req.query.id;
    console.log(qid);
    const escort = await Escort.findById(qid)
    res.render('update_esc', {manage:true, isDel:true ,branch: "Deliveries", title:"Orders", escort: escort})
});

router.get('/success', (req,res)=>{
    res.render('success');
});


function checkAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}

function checkRole(req,res,next){
    if(req.user.isAdmin){
        return next();
    }

    res.redirect('/deliver');
}


module.exports = router;