const express = require('express')
const {Server: IOServer}= require('socket.io')
const {Server: HTTPServer}= require('http')
const moment = require('moment/moment')

const app= express()
const httpServer = HTTPServer(app)
const io = new IOServer(httpServer)

//Middleware

app.use(express.static('public'))

// Arrays

const messages=[]

const products=[]

//App

const port=8080
httpServer.listen(port, ()=>{
    console.log(`se esta escuchando en el puerto ${port}`)
})

//WebSocket

io.on('connection', (socket)=>{
    console.log('Un cliente se conecto')

    socket.emit('products', products)

    socket.emit('messages', messages)

    socket.on('new-product', (data)=>{
        console.log(data)
        products.push(data)
        io.sockets.emit('products', products)
    })

    socket.on('new-message', (data)=>{
        messages.push(data)
        io.sockets.emit('messages', messages)
    })
})
