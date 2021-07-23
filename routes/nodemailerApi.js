require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');



router.post('/api/nodeMailer', async(req, res) => {
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
  // first way
//   transporter.sendMail(mailOptions, (err, data) => {
//       if(err){
//           console.log('error occurs', err);
//           res.status(500).json({message: 'Internal server error!'});
//       }else{
//           console.log('Email sent!!!');
//           res.json({message: 'Email sent successfully'});
//       }
//   });

  // second way 
  try{
      const data = await transporter.sendMail(mailOptions);
       res.json({message: 'Email sent successfully'});
  }catch (err)
  {
    console.log('error occurs', err);
    res.status(500).json({message: 'Internal server error!'});
  }

  // third way
//   transporter.sendMail(mailOptions).then(data => {
//     res.json({message: 'Email sent successfully'})
    
//   }).catch(err => {
//     console.log('error occurs', err);
//     res.status(500).json({message: 'Internal server error!'});
//   });


})

// with static html
router.post('/api/nodeMailerWithHtml', async(req, res) => {
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
    // step 2: read html template as string
    // step 2.1: read template path
       const templatePath = path.resolve('./mailTemplates', 'notification.html');
    //   console.log(templatePath);
    // step 2.2: read template as string
       const template =  fs.readFileSync(templatePath, {encoding: 'utf-8'});
     //  console.log(template);
    //step 3: mail options
    let mailOptions = {
        from: 'malzovich@gmail.com',
        to: 'bouani.malek.89@gmail.com',
        subject: 'Testing and testing',
        html: template
    };
    
    //step 4: sending the mail
  
    try{
        const data = await transporter.sendMail(mailOptions);
         res.json({message: 'Email sent successfully'});
    }catch (err)
    {
      console.log('error occurs', err);
      res.status(500).json({message: 'Internal server error!'});
    }
  
  })

  // with dynamic html 
  router.post('/api/nodeMailerWithEjs', async(req, res) => {
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
    // step 2: read html template as string
    // step 2.1: read template path 
       const templatePath = path.resolve('./mailTemplates', 'notification.html');
      // console.log(templatePath);
    // step 2.2: read template as string
       const template =  fs.readFileSync(templatePath, {encoding: 'utf-8'});
      // console.log(template);
    // step 2.3: template rendering
       const mailParams = {name: 'malek'};
       const render = ejs.render(template, mailParams);
      // console.log(render);
       const filePath = path.resolve('./mailAttachements/12312.jpg');
      // console.log(filePath);
    //step 3: mail options
    let mailOptions = {
        from: 'malzovich@gmail.com',
        to: 'bouani.malek.89@gmail.com',
        subject: 'Testing attachement',
        html: render,
        attachments: [
            {
                filename: 'image.jpg',
                path: filePath
            },
            {
                filename: 'test.png',
                path: './mailAttachements/lisa.png'
            },
            {
                filename: 'readStream.png',
                content: fs.createReadStream('./mailAttachements/todo.png') 
            }
        ]
    };
    
    //step 4: sending the mail
  
    try{
        const data = await transporter.sendMail(mailOptions);
         res.json({message: 'Email sent successfully'});
    }catch (err)
    {
      console.log('error occurs', err);
      res.status(500).json({message: 'Internal server error!'});
    }
  
  })

module.exports = router;