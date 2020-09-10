require('dotenv').config();
const router = require('express').Router();
const nodemailer = require("nodemailer");


// Creation of the email transport method
const smtpTransport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
        user: process.env.NODEMAILER_IDENTIFIER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
router.post('/', (req, res) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL, // Expediteur
        to: process.env.RECIPIENT_EMAIL, // Destinataires
        subject: "Coucou !", // Sujet
        text: "Hello world ✔", // plaintext body
        html: "<b>Hello world ✔</b>", // html body
    };
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(422).json({
            error: 'At least one the required fields is missing'
        });
    }
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
        return res.status(422).json({
            error: 'Invalid email',
        });
    }
        smtpTransport.sendMail(mailOptions, (error, response) => {
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json("Message sent: " + response.message);
            }
            smtpTransport.close();
        });
});



module.exports = router;