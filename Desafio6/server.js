const express = require('express')
const {Server: IOServer}= require('socket.io')
const {Server: HTTPServer}= require('http')
const hbs= require('express-handlebars')
const moment= require('moment')

const app= express()
const httpServer = HTTPServer(app)
const io = new IOServer(httpServer)

//Middleware

app.use(express.static('public'))

//EJS

app.set('views', './views')
app.set('view engine', 'ejs')

// Arrays

const messages=[]

const products=[
    {
        name: 'regla',
        price: 200,
        thumbnail: 'https://media.revistagq.com/photos/6093c6a946471da024886001/master/w_1600%2Cc_limit/nike_air-force-1-07-zapatillas.jpeg'
    }
]

//App

// app.get('/', (req,res)=>{
//     res.render('index', ({products}))
// })

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
