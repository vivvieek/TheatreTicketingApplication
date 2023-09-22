const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require ('jsonwebtoken');

const csvtojson=require("csvtojson");
const multer=require('multer');
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

const Student=require("../model/studentSchema");
const Noti=require("../model/notificationSchema");
const User=require("../model/userSchema");

router.use(express.json());
router.use(express.urlencoded({extended:true}));

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        bcrypt.compare(password, user.password)
          .then(isValid => {
            if (isValid) {
              const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
              res.json({ message: 'Login successful', token });
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
          })
          .catch(err => {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ message: 'Internal server error' });
          });
      }
    })
    .catch(err => {
      console.error('Error finding user:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});
  
// token verification
function verifytoken(req,res,next){
  try {
    if(!req.headers.authorization) throw 'Unauthorized';
    let token=req.headers.authorization.split(' ')[1];
    if(!token) throw 'Unauthorized';
    let payload=jwt.verify(token,'secretKey');
    if(!payload) throw 'Unauthorized';
    next()
  } catch (error) {
    res.status(401).send('Error')
  }
}

module.exports = router