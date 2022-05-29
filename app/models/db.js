require('dotenv').config();
const mysql = require('mysql2');
// const dbConfig = require('../config/db.config.js');

// Create a connection to the database
const connection = mysql.createConnection({
    // host: dbConfig.HOST,
    // user: dbConfig.USER,
    // password: dbConfig.PASSWORD,
    // database: dbConfig.DB,

    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

// open the MySQL connection
connection.connect((error) => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

module.exports = connection;
