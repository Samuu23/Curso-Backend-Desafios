const {Router}= require('express')
const container= require('../Container/ClientSQL')
const {mysql}= require('../Container/config')

const router= Router()
const db= new container(mysql, 'products')

router.get('/', async(req, res)=>{
    let products= await db.list()
})

router.get('/:id', async(req, res)=>{
    let product= await db.getById(req.params.id)
    res.json({response: product})
})

router.post('/', async(req, res)=>{
    let prod= req.body
    let result= await db.insert(prod)
    res.json({response: result})
})

router.put('/:id', async(req,res)=>{
    let { id } = req.params
	let newProduct = req.body
	let result = await db.updateById(newProduct, id)

    res.json({response: result})
})

router.delete('/:id', async (req,res)=>{
    let { id } = req.params
	let result = await db.deleteById(id)
    
    res.json({response: result})
})

module.exports= router