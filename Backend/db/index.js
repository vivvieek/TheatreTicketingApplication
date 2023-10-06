require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
    })
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));