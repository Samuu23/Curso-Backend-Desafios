const { mysql, sqlite } = require('../Container/options')
const mysqlKnex = require('knex')(mysql)
const sqliteKnex = require('knex')(sqlite)

mysqlKnex.schema.dropTableIfExists('products')
	.finally(() => {
		mysqlKnex.schema.createTable('products', table => {
			table.increments('id')
			table.string('title').notNullable()
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
			table.timestamp('send_at').defaultTo(sqliteKnex.fn.now());
			table.string('message').notNullable()
		})
			.then(() => console.log('SQLite3 Table created'))
			.catch((err) => { console.log(err); throw err })
			.finally(() => { sqliteKnex.destroy() })
	})


