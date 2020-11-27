const express       = require('express');
const session       = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router        = express.Router();
const userModel		= require.main.require('./models/userModel');


router.get('*',  (req, res, next)=>{
	if(req.session.user == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/fileupload',(req,res)=>{
    res.render('/vuser/fileupload',{user: req.session.user});
});

router.post('/send',(req,res)=>{
    res.render('/vuser/contact')
});

router.get('/vuser/chat',(req,res)=>{
    res.redirect('/vuser/chat') 
});


router.get('/vuser/contact',(req,res)=>{
    res.render('vuser/contact')
});

router.get('/vuser/customerHome',(req, res)=>{
    res.render('vuser/customerHome', {user: req.session.user});
});

router.get('/edit/customer/:uid',(req, res)=>{
	var uid=req.params.uid;
	userModel.getById(uid,(results)=>{		
	res.render('vuser/editProfile',{urole: 'customer', user:results[0]});
	});
});

router.post('/edit/customer/:uid', [
    //
    body('uname')
    .notEmpty()
    .withMessage('uname is required'),
    
    //
    body('uphone')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('uemail is required'),

    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('upassword is required')

  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }else{
        user={
            uid: req.params.uid,
            uname: req.body.uname,
            uphone: req.body.uphone,
            uemail: req.body.uemail,
            urole: 'customer',
            ustatus: 'valid',
            upassword: req.body.upassword
        };

        userModel.update(user,(status)=>{
            if(status){
                res.redirect('/user/vuser/customerHome');
            }else{
                res.send('Update failed');
            }
            
        });

    }
});

module.exports = router;