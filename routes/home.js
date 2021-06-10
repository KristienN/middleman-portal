const router = require('express').Router();
const passport = require('passport');
const axios = require('axios');


router.get('/about', checkAuth,(req,res) =>{
    res.render('about', {manage:false, isDel:true,branch: "", title:"About"});
});

router.get('/drivers', checkAuth,(req,res) =>{
    res.render('drivers', {manage:true, isDel: true,branch: "Drivers", title:"Drivers"});
});

router.get('/deliver', checkAuth,(req,res) =>{
    res.render('deliver', {manage:false,isDel: true ,branch: "Deliveries", title:"Orders"});
});

router.get('/escort', checkAuth, (req,res)=>{
    res.render('escort', {manage:false,isDel:false, branch: "Escort", title:"Orders"});
});

router.get('/manage', checkAuth, checkRole, (req,res)=>{
    axios.get('http://localhost:5000/api/request/')
    .then(requests =>{
        res.render('manage', {manage:true, isDel:true ,branch: "Deliveries", title:"Orders", data: requests.data})
    })
    .catch(err => res.status(500).json("error" + err));
    
});

router.get('/manage_esc', checkAuth, (req,res)=>{
    axios.get('http://localhost:5000/api/escort/')
    .then(escorts =>{
        res.render('manage_esc', {manage:true, isDel:false ,branch: "Escort", title:"Orders", data: escorts.data})
    })
    .catch(err => res.status(500).json("error" + err));
    
});

router.get('/update_del', checkAuth, async (req,res)=>{
    const qid = req.query.id;
    await axios.get('http://localhost:5000/api/request/',{}, {params: { id: qid}})
    .then((requestdata)=>{
        console.log(requestdata);
        res.render('update_del', {manage:true,isDel:true ,branch: "Deliveries", title:"Orders", request: requestdata.data})
    })
    .catch(err=> res.status(500).json("Error"));
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