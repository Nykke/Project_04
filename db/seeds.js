const mongoose = require('mongoose');
const seeder = require("mongoose-seed");

seeder.connect('mongodb://localhost/project_04_db', function(){

  seeder.loadModels(
    User = require("./models.js").User,
    Maintenance_Request = ("./models.js").Maintenance_Request
  );

  seeder.clearModels(["Maintenance_Request", "User"], function(){
    seeder.populateModels("./seedData.json", function(){
      seeder.disconnect();
    })
  })
})
