const seeder = require("mongoose-seeder");

seeder.connect('mongodb://localhost/project_04', function(){

  seeder.loadModels(
    User = require("./models.js").User,
    Maintenance_Request = require("./models.js").Maintenance_Request
  );

  seeder.clearModels(["Maintenance_Request", "User"], function(){
    seeder.populateModels("./seedData.json")
  })
})
