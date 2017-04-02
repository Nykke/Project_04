//defining express
const express = require("express");
const app = express();
//server for angular
const http = require("http").Server(app);
//defining body-parser
const parser = require("body-parser");
const User = require("./db/models.js").User;
const Maintenance_Request = require("./db/models.js").Maintenance_Request;

app.set("port", process.env.PORT || 3001)

//the public folder is now defined as assets
app.use("/assets", express.static("public"))
//configuring body-parser to support html forms
app.use(parser.urlencoded({extended: true}))

//route defined for the index of all maintenance_requests
app.get("/api/maintenance_requests", function(req, res){
  Maintenance_Request.find({}).then(function(maintenance_requests){
    res.json(maintenance_requests);
  });
})

//route defined to create a maintenance_request
app.post("/api/maintenance_requests", function(req, res){
  Maintenance_Request.create(req.body.maintenance_request).then(function(maintenance_request){
    res.json(maintenance_request);
  });
})

//route defined for editing a maintenance_request
app.put("/api/maintenance_requests/:tenant_name", function(req, res){
  Maintenance_Request.findOneandUpdate({tenant_name: req.params.tenant_name}, req.body,
  {new: true}).then(function(maintenance_request){
    res.json(maintenance_request);
  });
})

//route definded for deleting/removing a maintenance_request
app.delete("/api/maintenance_request/:tenant_name", function(req, res){
  Maintenance_Request.findOne({tenant_name: req.params.tenant_name}).then(function(maintenance_request){
    res.json(maintenance_request);
  });
})


//port where our app resides
app.listen(3001, () => {
  console.log("express is connected")
});
