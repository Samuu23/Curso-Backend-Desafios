const { json } = require('express')
const fs = require('fs')

module.exports = class File {
    constructor(nameFile){
        this.nameFile = `${__dirname}/db/${nameFile}.json`
    try{
        this.elements = fs.readFileSync(this.nameFile, 'utf-8')
        this.elements = JSON.parse(this.elements)
    }catch(error){
        this.elements = []
    }
    }

    allProducts(){
        return this.elements
    }

    prodById(id){
        try {
            let itemId = { id }
            let itemFind= this.elements.find(elem=>elem.id== id)
            itemId= itemFind
            return itemId
          } catch (error) {
            console.log(error)
          }
    }
    save(obj){
        try{
            if (this.elements.length == 0) {
                obj.id = 1
            } else {
                obj.id = this.elements.length + 1 
            }
            this.elements.push(obj)
            
            fs.promises.writeFile(this.nameFile, JSON.stringify(this.elements, null, '\t'))
                .then(()=> console.log('El elemento fue guardado'))
                .catch(err=>console.log(err))
            
            return({obj})
        }catch(error){
            console.log(error)
        }
    }

    update(obj){
        try{
            let itemToUpdate= this.elements.find(item=> item.id==obj.id)
            let newItem= {...itemToUpdate, ...obj}

            let index= this.elements.indexOf(itemToUpdate)
            this.elements[index]= newItem

            fs.promises.writeFile(this.nameFile, JSON.stringify(this.elements, null, '\t'))
                .then(()=> console.log('El elemento fue actualizado'))
                .catch(err=>console.log(err))
            return this.elements    
        }catch(error){
            console.log(error)
        }
    }

    delete(id){
        let itemToDelete= this.elements.find(item=> item.id==id)

        let index=this.elements.indexOf(itemToDelete)
        this.elements.splice(index, 1)

        fs.promises.writeFile(this.nameFile, JSON.stringify(this.elements, null, '\t'))
            .then(()=> console.log(`El elemento numero ${id} fue eliminado`))
            .catch(err=>console.log(err))
            return this.elements
    }

}