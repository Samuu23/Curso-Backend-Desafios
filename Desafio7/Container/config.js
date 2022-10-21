const mysql= {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'products'
    }
}

const mysqlite= {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/dataBase/ecommerce.sqlite`    
    },
    useNullAsDefault: true  
}

module.exports= { mysql, mysqlite}