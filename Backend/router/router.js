const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require ('jsonwebtoken');
const multer = require('multer')


const User=require("../model/customerschema");
const Noti = require('../model/notificationschema');
const Movie = require('../model/movieschema');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

// Resgister User
router.post('/adduser',(req,res)=>{
  console.log(req.body);
  const newUser=new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    moviebooked:req.body.movieBooked,
    seatsbooked:req.body.seatsBooked,
  });
  newUser.save()
    .then(()=>{
      res.status(200).json({message:'Registered Successfully'});
    })
    .catch((error)=>{
      res.status(500).json({error:'Failed to Register'});
    })
})

// Login
router.post('/login',async(req,res)=>{
  try {
    var email=req.body.emailInput;
    var pass=req.body.passwordInput;
    var role='admin';
    if((email=='admin@email.com'&&pass=='admin123')){
      let payload={id:role,password:pass};
      let token=jwt.sign(payload,'secretkey');
      res.status(200).send({message:'Success',token:token});
    }
    else {
      User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: 'Invalid credentials' });
        } 
        else {
          if ((email==user.email&&pass==user.password)) {
            let role='customer';
            let payload={id:role,password:pass}; 
            let token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
            res.json({ message: 'Login successful', token:token });
          } 
          else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        }
      })
      .catch(err => {
        console.error('Error finding user:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
    }
  } 
  catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

// View Customer Data
router.get('/viewcus',(req,res)=>{
  User.find()
  .then((users)=>{
    res.status(200).json(users);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});

// Delete Customer Data
router.delete('/delcus/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Add notification
router.post('/addmess', (req,res)=>{
  console.log(req.body);
  const newNoti=new Noti({
    notificationmess:req.body.notificationmess
  });
  newNoti.save()
    .then(()=>{
      res.status(200).json({message:'Message Added'});
    })
    .catch((error)=>{
      res.status(500).json({error:'Failed to Add Message'});
    })
})

// View notification
router.get('/viewmess',(req,res)=>{
  Noti.find()
  .then((notification)=>{
    res.status(200).json(notification);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});

// Delete notification
router.delete('/deletemess/:_id',(req, res) => {
  Noti.findByIdAndRemove(req.params._id)
  .then((notification)=>{
    if (notification){
      res.status(200).json({message:'Message deleted successfully'});
    }else{
      res.status(404).json({error:'Message not found'});
    }
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to delete Message'});
  });
});

// Add movie
const upload = multer({ dest: 'uploads' });
router.post('/addmovie', upload.single('image'), async (req, res) => {
  console.log(req.body);

  try {
    const newMovie = new Movie({
      name: req.body.name,
      category: req.body.category,
      language: req.body.language,
      cast: req.body.cast,
      description: req.body.description,
      rating: req.body.rating,
      seats: req.body.seats,
      price: req.body.price,
      screen: req.body.screen,
      image: req.file.path,
    });
    await newMovie.save();
    res.json({ message: 'Movie Added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to Add Movie' });
  }
});

// View movie
router.get('/viewmovie',(req,res)=>{
  Movie.find()
  .then((movies)=>{
    res.status(200).json(movies);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});


// token verification
// function verifytoken(req,res,next){
//   try {
//     if(!req.headers.authorization) throw 'Unauthorized';
//     let token=req.headers.authorization.split(' ')[1];
//     if(!token) throw 'Unauthorized';
//     let payload=jwt.verify(token,'secretKey');
//     if(!payload) throw 'Unauthorized';
//     next()
//   } catch (error) {
//     res.status(401).send('Error')
//   }
// }

module.exports = router