//declaration
const express 						= require('express');	
const bodyParser 					= require('body-parser');
const session 					    = require('express-session');
const cookieParser 					= require('cookie-parser');
const {body, validationResult} 		= require('express-validator');
//const upload 						= require('express-fileupload');
const upload 				    	= require('express-fileupload');


const login							= require('./controllers/login');
const logout						= require('./controllers/logout');
const user							= require('./controllers/user');
const mail							= require('./controllers/mail')
const registration					= require('./controllers/registration');
const contact						= require('./controllers/contact');
const fileupload					= require('./controllers/fileupload');
const chat						    = require('./controllers/chat');
const app							= express();
const port							= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'secret value', saveUninitialized: true, resave: false}));


app.use('/', login);
app.use('/login', login);
app.use('/logout', logout);
app.use('/user', user);
app.use('/registration', registration);
app.use('/contact', contact);
app.use('/chat', chat);
app.use('/send',contact);
app.use('/fileupload',fileupload);


//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});