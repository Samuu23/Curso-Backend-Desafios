const { Router } = require('express')
const data = []
const router = Router()
const container = require('../Container/ClientSQL')
const { mysql } = require('../Container/options')
const faker = require('faker')
const path = require('path')

const db = new container(mysql, 'products')


// GET
router.get('/', async (req, res) => {
	let products = await db.list()
	res.send({ algo: 'holi', products })
})

router.get('/products', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/products.html'))
})

router.get('/messages', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/messages.html'))
})

router.get('/:id', async (req, res) => {
	let product = await db.getById(req.params.id) != [] ? 'No data' : db.getById(req.params.id)  
  res.json({ result: product })
})

// POST
router.post('/', async (req, res) => {
	let postProduct = req.body
	let result = await db.insert(postProduct)
	res.json({ result })
})

router.put('/:id', async (req,res) => {
  let { id } = req.params
	let newProduct = req.body
	let result = await db.updateById(newProduct, id)
 
  res.json({status: "Updated", product: result})
})

// DELETE
router.delete('/:id', async (req, res) => {
	let { id } = req.params
  let prodId = await db.deleteById(id)

	res.json({ status: 'deleted', response: prodId })

})

router.get('/api/products-test', (req, res) => {
	let products = []

	for(let i = 1; i < 6; i++){
		const randomProduct = {
			title: faker.commerce.product(),
			price: faker.datatype.number({min: 1000, max: 10000}),
			thumbnail: faker.image.imageUrl(400, 600, 'bike', true)
		}
		products.push(randomProduct)
	}

	res.json(products)

})


module.exports = router
