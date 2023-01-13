const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  //MySQL username
  user: "root",
  //MySQL passwor
    password: "$Eabass33",
  database: "company_db",
});

module.exports = db;