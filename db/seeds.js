const Maintenance_Request = require("./models.js").Maintenance_Request;
const User = require("./models.js").User;
const seedData = require("./seedData.json");

Maintenance_Request.remove({}, err =>{
  if (err){
    console.log(err);
  }
});

User.remove({}, err => {
  if (err){
    console.log(err);
  }
});

var tom = new User({
  category: "tenant",
  division : "apartment"
});

var dede = new User({
  category: "landlord",
  division: "management"
});

var bathroom = new Maintenance_Request({
  tenant_name: "Tom",
  building_number: 17101,
  apt_number: 101,
  type: "bathroom",
  urgency: "high",
  description: "show is overflowing when water is turned on",
  completed: "no"
});

var kitchen = new Maintenance_Request({
  tenant_name: "Rachel",
  building_number: 20033,
  apt_number: 204,
  type: "kitchen",
  urgency: "medium",
  description: "ligt is flickering",
  completed: "no"
});

var rachel = new User({
  category: "tenant",
  division: "apartment"
});

var maria = new User({
  category: "landlord",
  division: "apartment"
});

var users = [tom, dede, rachel, maria];
var maintenance_requests = [bathroom, kitchen];

users.forEach(function(user,i){
  user.maintenance_requests.push(maintenance_requests[i], maintenance_requests[i+1]); 
  user.save(function(err){
    if (err){
      console.log(err);
    } else {
      console.log("request made!");
    }
  });
});
