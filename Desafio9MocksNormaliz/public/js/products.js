const socket = io()

async function handlerEvent(products){
	console.log(products)
	const template = await fetch('/templates/products.hbs')
	const textTemplate = await template.text()
	const functionTemplate = Handlebars.compile(textTemplate)
	const html = functionTemplate({ products })

	document.querySelector('#products').innerHTML = html
}

document.addEventListener('DOMContentLoaded', (ev) => {
	fetch('http://localhost:3000/api/products-test')
		.then(response => response.json())
		.then(products => handlerEvent(products))
		.catch(err => console.log(err))
})
