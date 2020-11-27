const express = require('express');
const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const router 	= express.Router();

const app = express();

// View engine setup
app.set('view engine', 'ejs')
//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');

// Static folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Body Parser Middleware
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
 app.locals.layout = false;
 res.render('vuser/contact', {layout: false}); 
 //res.render('contact');
});

router.post('/', (req, res) => { 
  
  var output = `
  <ul> 
  <li>Name: ${req.body.name}</li>
  <li>Address: ${req.body.haddress}</li>
  <li>Email: ${req.body.email}</li>
  <li>Phone: ${req.body.phone}</li>
  </ul> 
    <h3>Message</h3>
    <p>req.body.message</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ahmediftekhar364@gmail.com', // generated ethereal user
        pass: 'prince00770'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols

  let mailOptions = {
      from: 'ahmediftekhar364@gmail.com', // sender address
      to: 'prince.iftekhar007@gmail.com', // list of receivers
      subject: 'Customer Contact Request', // Subject line
      text: 'Hello world', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
     // const info = await transporter.sendMail(msg)
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      app.locals.layout = false;
      res.send('done');
      //res.render('vuser/contact', {layout: false}); 
      res.render('vuser/contact');
  });
  });

  
  module.exports = router;