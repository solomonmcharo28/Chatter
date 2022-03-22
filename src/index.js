const express = require('express');
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || "3000"
const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) =>{
    console.log("New WebSocket Connection")

    //socket.emit('countUpdated', count)
    socket.emit('message', "Hello, Welcome to the Chat Room")
    socket.broadcast.emit("message", "A new user has joined")
    socket.on('increment', () =>{
        count++;
        //socket.emit('countUpdated', count)
        io.emit('countUpdated', count)
    })
    socket.on('sendMessage', (msg)=>{
        //console.log(msg)
         io.emit('message', msg)
    })
    socket.on("disconnect", ()=>{
        io.emit('message', "A user has left!")
    })
    socket.on("sendLocation", (pos)=>{
        io.emit('message', `Location : https://google.com/maps?q=${pos.latitude},${pos.longitude}`)
    })
})
server.listen(port, ()=> {
    console.log("Server is on port " + port);
})
