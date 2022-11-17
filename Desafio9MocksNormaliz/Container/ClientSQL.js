const knex = require('knex')

class ClientSQL {
	constructor(config, table){
		this.knex = knex(config)
		this.table = table 
	}

	async insert(elements){
		return await this.knex(this.table).insert(elements)
	}

	list(){
		return this.knex(`${this.table}`).select('*')
	}

	getById(id){
		return this.knex.from(this.table).where('id', id).select('*')
	}

	deleteById(id){
		return this.knex.from(this.table).where('id', id).del()
	}

	updateById(element, id){
		console.log(element, id)
		return this.knex.update(element).where('id', id)
			.then(res => { return res })		
			.catch(err => { console.log(err); throw err })
	}

	close(){
		this.knex.close()
	}

}

module.exports = ClientSQL
