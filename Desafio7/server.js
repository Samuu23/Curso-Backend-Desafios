const express= require('express')
const {Server: IOServer}=require('socket.io')
const {Server: HttpServer}= require('http')
const container=require('./Container/ClientSQL')
const {mysql, mysqlite}=require('./Container/config')

//Setting SV
const app= express()
const httpServer= HttpServer(app)
const io= new IOServer(httpServer)

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/Public`))

//app
app.get('/', (req, res)=>{
    res.json({mensaje: 'funciona bien'})
})
// Knex 
const mysqlCon = new container(mysql, 'products')
const sqliteCon = new container(mysqlite, 'messages')

//Listener
const port=3000
httpServer.listen(port, ()=>console.log(`Server on port ${port}`))

//WebSocket

io.on('connection', async (socket)=>{
    console.log('Un cliente se conecto')

    socket.emit('products', await mysqlCon.list())

    socket.emit('messages', await sqliteCon.list())

    socket.on('new-product', async (data)=>{
        await mysqlCon.insert(data)
        let products = await mysqlCon.list()
        io.sockets.emit('products', products)
    })

    socket.on('new-message', async (data)=>{
        await sqliteCon.insert(data)
        let messages= await sqliteCon.list()
        io.sockets.emit('messages', messages)
    })
})