const express           = require('express')
const app               = express()
const path              = require('path');
const http              = require('http').createServer(app)
const router 	        = express.Router();
 



app.use(express.static(__dirname + '/assets'))

router.get('/', (req, res) => {
     res.render('vuser/chat');

})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
module.exports = router;