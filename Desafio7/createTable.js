const {mysql, mysqlite}=require('./Container/config')
const mysqlKnex = require('knex')(mysql)
const sqliteKnex = require('knex')(mysqlite)

mysqlKnex.schema.dropTableIfExists('products')
	.finally(() => {
		mysqlKnex.schema.createTable('products', table => {
			table.increments('id')
			table.string('name').notNullable()
			table.float('price').notNullable()
			table.string('thumbnail').notNullable()
		})
			.then(() => console.log('MySQL Table created'))
			.catch((err) => { console.log(err); throw err })
			.finally(() => { mysqlKnex.destroy() })
	})


sqliteKnex.schema.dropTableIfExists('messages')
	.finally(() => {
		sqliteKnex.schema.createTable('messages', table => {
			table.increments('id')
			table.string('email').notNullable()
			table.timestamp('time').defaultTo(sqliteKnex.fn.now());
			table.string('text').notNullable()
		})
			.then(() => console.log('SQLite3 Table created'))
			.catch((err) => { console.log(err); throw err })
			.finally(() => { sqliteKnex.destroy() })
	})