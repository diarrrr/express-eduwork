const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'admin',
    password: 'admin1',
    database: 'eduworkcruds'
});

module.exports = connection; 