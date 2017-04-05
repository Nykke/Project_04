const mongoose = require('./connection.js')

const Maintenance_RequestSchema = new mongoose.Schema({
  tenant_name: String,
  building_number: Number,
  apt_number: Number,
  type: String,
  urgency: String,
  description: String,
  completed: String,
  users: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

const UserSchema = new mongoose.Schema({
  name: String,
  category: String,
  division: String,
  // Maintenance_Requests: [ {type: Schema.ObjectId, ref:"Maintenance_Request"} ]
})

const Maintenance_Request = mongoose.model("Maintenance_Request", Maintenance_RequestSchema);
const User = mongoose.model("User", UserSchema);

module.exports ={
  Maintenance_Request: Maintenance_Request,
  User: User
};
