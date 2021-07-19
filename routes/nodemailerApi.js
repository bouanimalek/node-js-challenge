require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");



router.post('/api/nodeMailer', (req, res) => {
  //step 1: create transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }, 
    tls: {
             rejectUnauthorized: false
           }
  });
  
  //step 2: mail options
  let mailOptions = {
      from: 'malzovich@gmail.com',
      to: 'bouani.malek.89@gmail.com',
      subject: 'Testing and testing',
      text: 'it works'
  };
  
  //step 3: sending the mail
  transporter.sendMail(mailOptions, (err, data) => {
      if(err){
          console.log('error occurs', err);
      }else{
          console.log('Email sent!!!');
      }
  });
  res.json({message: 'Email sent successfully'});
})
module.exports = router;