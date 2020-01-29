const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');
 
// parse application/json
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(bodyParser.json());
//app.use(expressJwt({secret: 'tellevo-app-super-shared-secret'}).unless({path: ['/api/auth']}));

 
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

app.post('/api/auth', function(req, res) {
    const data = req.body;
    console.log("peticion realizada");
    let query = conn.query("SELECT * FROM users where username="+req.body.username, (err, results) => {
      if(err) throw err;
      console.log(results);
      return(JSON.stringify(results));
  });

    if(query.password == data.password){
        var token = jwt.sign({userID: user.id}, 'tellevo-app-super-shared-secret', {expiresIn: '1h'});
        res.send({token});
        console.log("usuario encontrado");
    }
    else{
        res.sendStatus(401);
        console.log("password invalid");
    }
    
    
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

  app.put('/api/users/:id',(req, res) => {
    let sql = "UPDATE users SET isDriver=''Y'' WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //add a ride to share

  //book a ride


 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});