const router = require('express').Router();
let Escort = require('../models/escort.model');

router.get("/", async (req,res)=>{
    await Escort.find()
    .then(escort=> res.json(escort))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.get("/:id", async (req,res)=>{
    const id = req.params.id;
    await Escort.findById(id)
    .then(escort=> res.json(escort))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.post("/add", async (req,res)=> {

    const traveller = req.body.traveller;
    const driver = req.body.driver;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const contact = req.body.contact;
    const price = Number(req.body.price);

    const newEscort = new Escort({
        traveller,
        driver,
        origin,
        destination,
        contact,
        price
    });

    await newEscort.save()
    .then(()=> res.redirect('../../../escort'))
    .catch((err)=> res.status(400).json('Error: '+ err));
});

router.put("/update/:id", async (req,res)=>{
    const id = req.params.id;
    await Escort.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        res.json("Updated Escort")
    })
    .catch(err =>{
        res.status(500).json("Error: " + err);
    })
});

router.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    await Escort.findByIdAndDelete(id)
    .then(data =>{
        res.json("Deleted");
    })
    .catch(err=>{
        res.status(500).json("Error: " + err);
    })
});

module.exports = router;