// Movie Schema
const mongoose = require('mongoose');
const movieSchema=new mongoose.Schema({
    name: String,
    category: String,
    language: String,
    cast: String,
    description: String,
    rating: String,
    seats: Number,
    price: Number,
    screen: String,
    image: String,
})

const Movie=mongoose.model('movie',movieSchema);
module.exports =Movie;