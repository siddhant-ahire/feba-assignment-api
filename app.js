const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var mailer = require("nodemailer");
const helmet = require('helmet');
const compression = require('compression');

//giving email authentication
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'


// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: `${"ahiresiddhant55@gmail.com" ||process.env.EMAIL_ID}`,
        pass: `${"8286262736" || process.env.EMAIL_PASSWORD}`
    }
});
const app = express();

//get form variables value
app.use(bodyParser.json());

//to get all urls request
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});
// Adding Email sending model
app.post('/email',((req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const dob = req.body.dob;
    message="happy birthday"
    console.log(name,email,dob)
    var mail = {
        from: email,
        to: "ahiresiddhant000@gmail.com",
        subject: "siddhantahireofficial.github.io",
        text: "new responce",
        html: `
          <p>Message:${message}</p></br>Name:<p>${name}</p> `
    }
    smtpTransport.sendMail(mail, function(error, response){
      if(error){
          console.log(error)
          return res.redirect('https://siddhant-ahire.github.io/error.html');
      }else{
          smtpTransport.close();
          return res.status(200).json({name:name});
      }
    });
})
);

//secure headers
app.use(helmet());
//for compress the files
app.use(compression());

const port = process.env.PORT;
//server startde on..
app.listen(port || 8080)

