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









//port where our app resides
app.listen(3001, () => {
  console.log("express is connected")
});
