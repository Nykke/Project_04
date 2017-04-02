const mongoose = require('./connection.js')

var Schema = mongoose.Schema
ObjectId = Schema.ObjectId

const Maintenance_RequestSchema = new mongoose.Schema({
  tenant_name: String,
  building_number: Number,
  apt_number: Number,
  type: String,
  urgency: String,
  description: String,
  completed: String
})

const UserSchema = new mongoose.Schema({
  category: String,
  division: String,
  maintenance_requests: [ {type: Schema.ObjectId, ref:"Maintenance_Request"} ]
})

const Maintenance_Request = mongoose.model("Maintenance_Request", Maintenance_RequestSchema);
const User = mongoose.model("User", UserSchema);

module.exports ={
  Maintenance_Request: Maintenance_Request,
  User: User
};
