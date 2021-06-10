const router = require('express').Router();
let Request = require('../models/request.model');

router.get("/", async (req,res)=>{
    await Request.find()
    .then(requests=> res.send(requests))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.get("/:id", async (req,res)=>{
    const id = req.params.id;
    await Request.findById(id)
    .then(requests=> res.send(requests))
    .catch(err=> res.status(400).json('Error: ' + err));
});


router.post("/add", async (req,res)=> {

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const driver = req.body.driver;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const contact = req.body.contact;
    const price = Number(req.body.price);

    const newRequest = new Request({
        sender,
        receiver,
        driver,
        origin,
        destination,
        contact,
        price
    });

    await newRequest.save()
    .then((response)=>{
        console.log("Added!");
        res.redirect('../../../deliver')
    })
    .catch((err)=> res.status(400).json('Error: '+ err));
});

router.put("/update/:id", async (req,res)=>{
    const id = req.params.id;
    await Request.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        res.json("Updated Request")
        res.redirect('../../../manage')
    })
    .catch(err =>{
        res.status(500).json("Error: " + err);
    })
});

router.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    await Request.findByIdAndDelete(id)
    .then(data =>{
        res.json("Deleted");
    })
    .catch(err=>{
        res.status(500).json("Error: " + err);
    })
});

module.exports = router;