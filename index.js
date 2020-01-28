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
 
//show all users
app.get('/api/users',(req, res) => {
    let sql = "SELECT * FROM users";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  //show single user
  app.get('/api/users/:id',(req, res) => {
    let sql = "SELECT * FROM users WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  //add new user
  app.post('/api/users',(req, res) => {
      console.log(req.body);
    let data = {
        name: req.body.name,
        surname: req.body.surname, 
        username: req.body.username, 
        password: req.body.password, 
        email: req.body.email, 
        phoneNumber: req.body.phoneNumber, 
        rut: req.body.rut, 
        sex: req.body.sex, 
        city: req.body.city, 
        region: req.body.region, 
        address: req.body.address,  
        birth: req.body.birth
    };
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  //update user by ID POR CADA CARACTERISTICA
  app.put('/api/users/:id',(req, res) => {
    let sql = "UPDATE users SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //show all car by userId

  app.get('/api/cars/:id',(req, res) => {
    let sql = "SELECT * FROM cars WHERE idUserOwner="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //get a car by id

  app.get('/api/car/:id',(req, res) => {
    let sql = "SELECT * FROM cars WHERE car_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //add a new car

  app.post('/api/car',(req, res) => {
    console.log(req.body);
  let data = {
      plate: req.body.plate,
      alias: req.body.alias, 
      marca: req.body.marca, 
      model: req.body.model, 
      year: req.body.year, 
      color: req.body.color, 
      motorId: req.body.motorId, 
      idUserOwner: req.body.idUserOwner, 
      idContactEmergency: req.body.idContactEmergency, 
  };
  let sql = "INSERT INTO cars SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

  //set user as a driver

  //add a ride to share

  //book a ride


 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});