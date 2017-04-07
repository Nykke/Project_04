const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/project_04_db', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('MongoDB Connected')
//   }
// })

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URL);
} else {
  mongoose.connect("mongodb://localhost/project_04_db");
}

module.exports = mongoose;
