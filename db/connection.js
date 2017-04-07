const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/project_04_db', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('MongoDB Connected')
//   }
// })

console.log("NODE ENV:" + process.env.NODE_ENV);
console.log("MDB URL:" + process.env.MONGOLAB_URL);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
} else {
  mongoose.connect("mongodb://localhost/project_04_db");
}

module.exports = mongoose;
