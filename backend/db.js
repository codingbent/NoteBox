const mongoose = require('mongoose');
const mongouri = "mongodb://localhost:27017/"; // Replace 'inotebook' with your database name

const connectToMongo = () => {
  mongoose.connect(mongouri)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};

module.exports = connectToMongo;