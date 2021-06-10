const router = require('express').Router();
const nodemailer = require('nodemailer');
let Escort = require('../models/escort.model');

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth:{
        user: "no_reply.middlemanafrica@outlook.com",
        pass:"Genesis@2021"
    },
});

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

    const str = "Traveller: " + sender+ ", Driver: " + driver + ", Destination: " + destination + ".";

    const message = {
        from: "no_reply.middlemanafrica@outlook.com",
        to: "middlemanafrica@gmail.com",
        subject: "New Request Added",
        text: " The following request has been successfully added: " + str
    }

    await newEscort.save()
    .then(()=> {
        transporter.sendMail(message, (err, info)=>{
            if(err) throw err;
        });
        res.redirect('../../../escort')
    })
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