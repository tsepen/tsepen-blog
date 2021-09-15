const mysql = require('mysql')

var dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'befree',
}

const connection = mysql.createConnection(dbConfig)

module.exports = { connection }
