// Rating Schema
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  username: String,
  movie: String,
  review: String,
});

const Review = mongoose.model('Review', ratingSchema);
module.exports = Review