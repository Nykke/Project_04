//defining express
const express = require("express");
const app = express();

//server for angular
const http = require("http").Server(app);

//defining body-parser
const parser = require("body-parser");

//pulling schemas from models
const User = require("./db/models.js").User;
const Maintenance_Request = require("./db/models.js").Maintenance_Request;

//connect to mongoose
const mongoose = require("./db/connection.js");

const methodOverride = require('method-override');

app.set("port", process.env.PORT || 3001)

//the public folder is now defined as assets
app.use("/assets", express.static("public"))

// Add Middleware necessary for REST API's
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//connecting to angular
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

//route defined for the index of all maintenance_requests
app.get("/api/maintenance_requests", function(req, res){
  Maintenance_Request.find({}).then(function(maintenance_requests){
    res.json(maintenance_requests);
  });
})

//route defined for the showing maintenance_requests
app.get("/api/maintenance_requests/:tenant_name", function(req, res){
  Maintenance_Request.findOne({tenant_name: req.params.tenant_name}).then(function(maintenance_request){
    res.json(maintenance_request)
  })
})

//route defined to create a maintenance_request
app.post("/api/maintenance_requests", function(req, res){
  Maintenance_Request.create(req.body).then(function(maintenance_request){
    res.json(maintenance_request);
  });
})

//route defined for editing a maintenance_request
app.put("/api/maintenance_requests/:tenant_name", function(req, res){
  Maintenance_Request.findOneAndUpdate({tenant_name: req.params.tenant_name}, req.body,{new: true}).then(function(maintenance_request){
    res.json(maintenance_request);
  });
})

//route defined for deleting/removing a maintenance_request
app.delete("/api/maintenance_requests/:tenant_name", function(req, res){
  Maintenance_Request.findOneAndRemove({tenant_name: req.params.tenant_name}).then(function(){
    res.json({success: true});
  });
})

//port where our app resides
app.listen(3001, () => {
  console.log("express is connected")
});
