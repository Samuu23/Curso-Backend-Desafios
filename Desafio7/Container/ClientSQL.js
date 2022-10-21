const knex = require('knex')

class ClientSQL {
    constructor(config, table){
        this.knex= knex(config)
        this.table= table
    }

    async insert(elem){
        const elements= await this.knex(this.table).insert(elem)

        return elements
    }

    list(){
        const elements= this.knex(this.table).select('*')

        return elements
    }

    getById(id){
        const element= this.knex.from(this.table).where('id','=', id).select('*')

        return element
    }

    deleteById(id){
        const element= this.knex.from(this.table).where('id','=',id).del()

        return element
    }

    updateById(id, atributo, atrActualizado){
        const elements= this.knex.from(this.table).where('id','=', id).update(atributo, atrActualizado)

        return elements
    }

    finaly(){
        this.knex.close()
    }
}

module.exports= ClientSQL