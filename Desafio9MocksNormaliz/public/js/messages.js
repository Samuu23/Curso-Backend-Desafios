const socket = io()

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
