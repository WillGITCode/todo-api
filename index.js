var express = require("express"),
    app = express();
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));


//Must git bash ./mongod inside "data"
//directory where Mongodb is installed first

// Variables for Mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
    client.close();
  });


app.get("/", function(req, res){
    res.sendfile("index.html");
});

app.use("/api/todos", todoRoutes);




app.listen(3000, function () {
    console.log("App is running on port 3000");
  })


