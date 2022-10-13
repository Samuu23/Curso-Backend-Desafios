const express = require('express')
const prodRouter = require('./Routes/prodRouter')
const cartRouter = require('./Routes/cartRouter')

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/productos', prodRouter)
app.use('/api/carrito', cartRouter)


// Server
const port=8000
app.listen(port, ()=>{
console.log((`server on Port ${port}`))
})