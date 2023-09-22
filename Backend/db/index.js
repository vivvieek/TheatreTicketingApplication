const mongoose = require('mongoose');
//MongoDB Atlas connect
mongoose.connect('mongodb+srv://spvivekbabu:fsda123@cluster0.h7vuisq.mongodb.net/ticketbooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
    })
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));