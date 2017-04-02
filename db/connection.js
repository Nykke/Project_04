const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project_04_db', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDB Connected')
  }
})

module.exports = mongoose;
