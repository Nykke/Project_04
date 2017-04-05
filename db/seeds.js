const Maintenance_Request = require("./models.js").Maintenance_Request;
const User = require("./models.js").User;

//clearing the database of existing maintenance_requests and users
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

//generating new instances of maintenance_requests and users
var tom = new User({
  name: "Tom",
  category: "tenant",
  division : "apartment"
});

var dede = new User({
  name: "Dede",
  category: "landlord",
  division: "management"
});

var rachel = new User({
  name: "Rachel",
  category: "tenant",
  division: "apartment"
});

var maria = new User({
  name: "Maria",
  category: "landlord",
  division: "apartment"
});

var jackie = new User({
  name: "Jackie",
  category: "tenant",
  division: "apartment"
});

var angie = new User({
  name: "Angie",
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
  completed: "no",
  users: [tom, dede]
});

var kitchen = new Maintenance_Request({
  tenant_name: "Rachel",
  building_number: 20033,
  apt_number: 204,
  type: "kitchen",
  urgency: "medium",
  description: "light is flickering",
  completed: "no",
  users: [maria, rachel]
});

var ac = new Maintenance_Request({
  tenant_name: "Jackie",
  building_number: 34005,
  apt_number: 105,
  type: "ac",
  urgency: "high",
  description: "air is no longer turning on, making a weird noise",
  completed: "yes",
  users: [jackie, angie]

});

//users and maintenance_requests are defined
var users = [tom, dede, rachel, maria, jackie, angie];
var maintenance_requests = [bathroom, kitchen, ac];

//assigning some maintenance_requests to each user
maintenance_requests.forEach(function(maintenance_request,i){
  maintenance_request.users.push(users[i], users[i+1]);
  maintenance_request.save(function(err){
    if (err){
      console.log(err);
    } else {
      console.log("request made!");
    }
  });
})

//assigning users to maintenance_requests
// users.forEach(function(user,i){
//   user.maintenance_requests.push(maintenance_requests[i], maintenance_requests[i+1]);
//   user.save(function(err){
//     if (err){
//       console.log(err);
//     } else {
//       console.log("request made!");
//     }
//   });
// })

//assigning specific maintenance_requests to specific users
bathroom.users.push(tom, dede)
bathroom.save((err, maintenance_request) => {
  if (err) {
    console.log(err);
  } else {
    console.log(maintenance_request)
  }
});

kitchen.users.push(rachel, maria)
kitchen.save((err, maintenance_request) => {
  if (err){
    console.log(err);
  } else {
    console.log(maintenance_request)
  }
});
