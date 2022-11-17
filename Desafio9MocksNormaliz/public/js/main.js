const socket = io()

// Products
const addProducts = document.querySelector('#addProducts')
addProducts.addEventListener('submit', e => {
	e.preventDefault()
	
	const product = {
		title: document.querySelector('#title').value,
		price: document.querySelector('#price').value,
		thumbnail: document.querySelector('#thumbnail').value
	}

	document.querySelector('#title').value = ""
	document.querySelector('#price').value = ""
	document.querySelector('#thumbnail').value = ""

	socket.emit('update', product)
})

async function handlerEvent(products) {
	console.log(products)
	const template = await fetch('/templates/products.hbs')
	const textTemplate = await template.text()
	const functionTemplate = Handlebars.compile(textTemplate)
	const html = functionTemplate({ products })

	document.querySelector('#products').innerHTML = html
} 

socket.on('products', handlerEvent)

// Messages

const addMessages = document.querySelector('#addMessages')
addMessages.addEventListener('submit', e => {
	e.preventDefault()

	let today = new Date()

	const message = {
		email: document.querySelector('#email').value,
		message: document.querySelector('#message').value
	}

	document.querySelector('#message').value = ''

	socket.emit('new-message', message)
})

async function showMessages(messages){
	const template = await fetch('/templates/messages.hbs')
	const textTemplate = await template.text()
	const functionTemplate = Handlebars.compile(textTemplate)
	const html = functionTemplate({ messages })

	document.querySelector('#messages').innerHTML = html
}

socket.on('messages', showMessages)
