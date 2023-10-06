// Ntification Schema
const mongoose = require('mongoose');
const notificationSchema=new mongoose.Schema({
    notificationmess:String
})
  
const Noti=mongoose.model('Notification',notificationSchema);
module.exports = Noti;