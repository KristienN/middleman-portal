const router = require('express').Router();
let Driver = require('../models/driver.model');

router.get("/", async (req,res)=>{
    await Driver.find()
    .then(drivers=> res.json(drivers))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.post("/add", async (req,res)=> {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const car = req.body.car;
    const contact = req.body.contact;
    const isActive = req.body.isActive;

    const newDriver = new Driver({
        fname,
        lname,
        car,
        contact,
        isActive,
    });

    await newDriver.save()
    .then(()=> res.render('success'))
    .catch((err)=> res.status(400).json('Error: '+ err));
});

// router.put("/update/:id", async (req,res)=>{

// });

// router.delete("/delete/:id", async (req, res)=>{
    
// });

module.exports = router;