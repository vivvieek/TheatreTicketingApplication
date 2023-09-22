// Movie Schema
const mongoose = require('mongoose');
const studentSchema=new mongoose.Schema({
    id: String,
    name: String,
    course: String,
    project: String,
    batch: String,
    status: String,
    placement: String,
})

const Student=mongoose.model('Studentdetail',studentSchema);
module.exports =Student;