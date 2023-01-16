const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  //MySQL username
  user: "root",
  //MySQL password
  password: "$Eabass33",
  database: "company_db",
});

module.exports = db;
