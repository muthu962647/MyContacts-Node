const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if(err){
        console.log("Connection Contains ERROR");
        return;
    }
    console.log("Connection Succesful");
});

module.exports = { connection };