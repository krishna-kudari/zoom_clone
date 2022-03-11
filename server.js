// console.log("hi")
const express=require("express")
const { Socket } = require("socket.io")
const app=express()
const server = require('http').Server(app)
const io=require('socket.io')(server)
const { v4: uuidV4 }=require('uuid')
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
})
app.set('view engine','ejs');
app.use(express.static('public'))

app.use('/peerjs',peerServer);

app.get('/', (req, res) =>{
    res.redirect(`/${uuidV4()}`)
    // 76224031-a7e9-4e4c-b0bf-e2dbdcd06bbd
    //54d31dc3-b47c-4173-b9ac-7f34fcacb821
    // res.status(200).send("hello World")
    // res.render('rooms');

})


app.get('/:rooms', (req, res) =>{
    res.render('rooms',{roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        // console.log("joined room");
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
    })
})

server.listen(3000)
