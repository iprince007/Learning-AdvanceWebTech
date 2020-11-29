const express = require('express');
const session = require('express-session');
const fileupload  = require('express-fileupload');
var bodyParser 	= require('body-parser');

const router 	= express.Router();

const app = express();

app.use(fileupload());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'my secret value', saveUninitialized: true, resave: false}));


router.get('/',(req, res)=>{
    res.render('vuser/fileupload');
});

router.post('/', (res,req )=>
{
if (req.files) {
    console.log(req.files)
    var file = req.files.file
    var filename = file.name 
    console.log(filename)

    file.mv('./uploads/' +filename ,function (err){
        if (err) {
             res.send(err)
        } else{
            res.send("Done!");
        }
    })
}

})

module.exports = router;