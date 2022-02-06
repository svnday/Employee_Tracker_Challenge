const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'asdf1234',
        database: 'employees'
    },
    console.log('Connected to the <Employees> database')
);

module.exports = db;