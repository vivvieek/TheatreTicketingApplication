// Booking Schema
const mongoose = require('mongoose');

const movieBookedSchema = new mongoose.Schema({
  username: String,
  movie: String,
  seats: Number,
});

const MovieBooked = mongoose.model('MovieBooked', movieBookedSchema);
module.exports = MovieBooked