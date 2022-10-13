const {Router}= require('express')
const File= require('../Container/file')
const Product = require('../Models/products')


const prodRouter= Router()
const control= new File('products')

//Routes
prodRouter.get('/', (req, res)=>{
    res.json(control.allProducts())
})

prodRouter.get('/:id', (req, res)=>{
    res.json(control.prodById(req.params.id))
})

prodRouter.post('/', (req, res)=>{
    let body= req.body
    let newProd = new Product(body.nombre, body.descripcion, body.codigo, body.foto, body.precio, body.stock)
    res.json(control.save(newProd))
})


prodRouter.put('/:id', (req, res)=>{
    let {id}= req.params
    let product= {...req.body, id:parseInt(id)}
    res.json(control.update(product))
})

prodRouter.delete('/:id', (req, res)=>{
    let {id}= req.params
    res.json(control.delete(id))
})



module.exports = prodRouter