const router = require('express').Router();
let Request = require('../models/request.model');
const nodemailer = require('nodemailer');
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

    const str = "Sender: " + sender+ ", Receiver: " + receiver + ", Driver: " + driver + ", Destination: " + destination + ".";

    const message = {
        from: "no_reply.middlemanafrica@outlook.com",
        to: "middlemanafrica@gmail.com",
        subject: "New Request Added",
        text: " The following request has been successfully added: " + str
    }

    await newRequest.save()
    .then((response)=>{
        console.log("Added!");
        transporter.sendMail(message, (err, info)=>{
            if(err) throw err;
        });
        res.redirect('../../../deliver');
        console.log("message sent!");
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