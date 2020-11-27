const express       = require('express');
const {body, validationResult} 		= require('express-validator');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const router       = express.Router();
const userModel		= require.main.require('./models/userModel');

router.get('/',(req, res)=>{
    res.render('login/index');
});


router.post('/', [
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('Email is required'),
    
    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('Password is required')

  ], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('login/index', {err:errors.array()});
    }else{
      var user={
        uemail: req.body.uemail, 
        upassword: req.body.upassword
      };
      userModel.validate(user,(status)=>{
        if(status){
          userModel.getUser(user, (results)=>{
         
             if(results[0].urole =='customer')
             {
              req.session.user=results[0];
              res.redirect('/user/vuser/customerHome');
            }
            else{
              res.send("You don't have permission to login");
            }
          });
          
        }else{
          res.redirect('/login');
        }
      });

    }
  });

  router.post('/', async (req, res) => {
    if (!req.body.captcha)
      return res.json({ success: false, msg: 'Please select captcha' });
  
    // Secret key
    const secretKey = '6LfGSeoZAAAAAOCh0wmFezmcGTiXdOKs-QpPwPzN';
  
    // Verify URL
    const query = stringify({
      secret: secretKey,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress
    });
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  
    //  verifyURL
    const body = await fetch(verifyURL).then(res => res.json());
  
    // If not successful
    if (body.success !== undefined && !body.success)
      return res.json({ success: false, msg: 'Failed captcha verification' });
  
    // If successful
    return res.json({ success: true, msg: 'Captcha passed' });
  });
  

module.exports = router;