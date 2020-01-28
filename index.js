const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Javier01',
  database: 'tellevoDatabase'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 

 

 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});