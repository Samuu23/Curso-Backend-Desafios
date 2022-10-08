
const socket= io.connect()

// Functions

const addProduct = (e)=>{
    const name= document.querySelector('#name').value
    const price= document.querySelector('#price').value
    const thumbnail= document.querySelector('#thumbnail').value
    socket.emit('new-product', ({name, price, thumbnail}))
    name, price, thumbnail = ''
    return false
}

const addMessages = (e) =>{
    const mail = document.querySelector('#mail').value
    const text = document.querySelector('#text').value
    const time = new Date().toString()
    socket.emit('new-message', ({mail, text, time}))
    reset(text)
    return false
}   

const render = (array)=>{
    if(!array.length){
        document.querySelector('#products').innerHTML= "<h1>No hay Productos</h1>"
    }else{
        document.querySelector('#products').innerHTML=`
        <table>
            <thead>
                <th>Titulo</th>
                <th>Precio</th>
                <th>Foto</th> 
            </thead>
            <tbody>
            </tbody>
        </table>`

        const html=array.map((element) => {
            return(`
                    <tr>
                        <td>${element.name}</td>
                        <td>${element.price}</td>
                        <td><img width="50" height="50" src="${element.thumbnail}" alt=""> </td>
                    </tr>`)
                }).join("")
        document.querySelector('tbody').innerHTML = html
    }
}

const renderMsg= (arrayMsj)=>{
    const html= arrayMsj.map((elem)=>{
        return(`<div>
                <em style="color: #996515"><strong style="color: blue">${elem.mail}</strong>[${elem.time}]:</em>
                <em style="font-style: italic; color: #008000">${elem.text}</em> </div>`)
    }).join("")
    document.getElementById('messages').innerHTML = html;
}

const reset=(campo)=>{
    document.querySelector(`#${campo}`).value = ''
}

//WebSocket

socket.on('products', (data)=>{
    render(data)
})

socket.on('messages', (data)=>{
    renderMsg(data)
})