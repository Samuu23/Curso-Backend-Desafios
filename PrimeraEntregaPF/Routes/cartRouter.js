const {Router, response}= require('express')
const Cart = require('../Models/cart')
const File = require('../Container/file')

const cartRouter= Router()
const controlCart= new File('cart')
const controlProd= new File('products')

const admin = (req, res, next)=>{
    req.admin = req.get('admin')
    console.log(req.admin)
    next()
}


//Routes

cartRouter.get('/', (req, res)=>{
    res.json({Response: 'esto es el carrito'})
})

cartRouter.post('/', (req, res)=>{
    let newCart= new Cart()
    let cart=controlCart.save(newCart)
    res.json(controlCart.allProducts(cart))
})

cartRouter.delete('/:id', (req, res)=>{
    let {id}= req.params
    res.json(controlCart.delete(id))
})

cartRouter.get('/:id/productos', (req, res)=>{
    let admin=true
    if(admin==true){
        let {id}= req.params
        let cart= controlCart.prodById(id)
        if(cart.products.length>0){
            res.json({response: 'no Products'})
        }else{
            res.json({ id: cart.id, products: cart.products})
        }
    }else{
        res.json({response: 'No tienes Permisos de Administrador'})
    }
})

cartRouter.post('/:id/productos', (req, res)=>{
    let {id}= req.params
    let cart = controlCart.prodById(id)
	let body = req.body.idProd
	body.map(idprod => {
		let prod = controlProd.prodById(idprod)
		cart.products.push(prod)	
	})
    controlCart.update(cart)
	res.json({cart: cart.id, products: cart.products})
})

cartRouter.delete('/:id/productos/:idProd', (req, res)=>{
    let {id}= req.params
    let {idProd}= req.params

    let cart= controlCart.prodById(id)
    let ProdToDelete= cart.products.find(prod=>prod.id==idProd)
    let newCart= cart.products.filter(prod=> prod.id != ProdToDelete.id)
    cart.products= newCart
    controlCart.update(cart)
    console.log(`el item ${ProdToDelete.id} fue eliminado de tu carrito`)
    res.json({cart: cart.id, products: cart.products})
})



module.exports = cartRouter