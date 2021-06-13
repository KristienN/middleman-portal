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
    .then(()=> res.json("added!"))
    .catch((err)=> res.status(400).json('Error: '+ err));
});

router.put("/update/:id", async (req,res)=>{
    const id = req.params.id;
    await Driver.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        res.json("Updated Request!")
    })
    .catch(err =>{
        res.status(500).json("Error: " + err);
    })
});

router.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    await Driver.findByIdAndDelete(id)
    .then(data =>{
        res.json("Deleted");
    })
    .catch(err=>{
        res.status(500).json("Error: " + err);
    })
});

module.exports = router;