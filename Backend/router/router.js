const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require ('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');

const User=require("../model/customerschema");
const Noti = require('../model/notificationschema');
const Movie = require('../model/movieschema');
const MovieBooked = require('../model/moviebooked');
const Review = require('../model/ratingschema')

require('dotenv').config()

const directory='./images'
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,directory)
  },
  filename:(req,file,cb)=>{
    const filename=file.originalname.toLowerCase().split(' ').join('-')
    cb(null,filename)
  }
})
var upload=multer({
  storage:storage,
  limits:{
    fileSize:1024*1024*10,
  },
  fileFilter:(req,file,cb)=>{
    if(
      file.mimetype=='image/png'||
      file.mimetype=='image/jpg'||
      file.mimetype=='image/jpeg'
    ){
      cb(null,true)
    } else{
      cb(null,false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

const transporter=nodemailer.createTransport({
  service:"hotmail", 
  auth:{
      user: process.env.myemail,
      pass: process.env.mypassword
  }
});

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use('/images', express.static('images'));

// Register User
router.post('/api/adduser',(req,res)=>{
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
router.post('/api/login',async(req,res)=>{
  try {
    var email=req.body.emailInput;
    var pass=req.body.passwordInput;
    var role='admin';
    if((email=='admin@email.com'&&pass=='admin123')){
      let payload={id:role,email:email};
      let token=jwt.sign(payload,'secretKey');
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
            let payload={id:role,email:email}; 
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

// View Customer Data
router.get('/api/viewcus',verifytoken,(req,res)=>{
  User.find()
  .then((users)=>{
    res.status(200).json(users);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});

// Delete Customer Data
router.delete('/api/delcus/:id',verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userEmail = user.email;
    // Seats wont get updated in movie schema
    await MovieBooked.deleteMany({ username: userEmail });
    await Review.deleteMany({username: userEmail})
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'User and related MovieBooked records deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user and related MovieBooked records', error: error.message });
  }
});

// Add notification
router.post('/api/addmess',verifytoken, (req,res)=>{
  // console.log(req.body);
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
router.get('/api/viewmess',(req,res)=>{
  Noti.find()
  .then((notification)=>{
    res.status(200).json(notification);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});

// Delete notification
router.delete('/api/deletemess/:_id',verifytoken,(req, res) => {
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
router.post('/api/addmovie',verifytoken, upload.single('image'), async (req, res) => {
  console.log(req.body);
  const url=req.protocol + '://' + req.get('host');
  try {
    const newMovie = new Movie({
      name: req.body.name,
      category: req.body.category,
      language: req.body.language,
      cast: req.body.cast,
      description: req.body.description,
      rating: req.body.rating,
      seats: req.body.seats,
      seatsbooked : req.body.seatsbooked,
      price: req.body.price,
      screen: req.body.screen,
      image: url+'/images/'+req.file.filename,
    });
    await newMovie.save();
    res.json({ message: 'Movie Added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to Add Movie' });
  }
});

// View all movies
router.get('/api/viewmovie', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Get one movie
router.get('/api/getonemovie/:_id',verifytoken, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params._id);
    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data');
  }
});

// Edit movie
router.put('/api/editmovie/:_id',verifytoken, async (req, res) => {
  try {
      let id = req.params._id
      let updateData = {$set: req.body}
      const updated = await Movie.findByIdAndUpdate(id, updateData,{ new: true })
      res.json(updated)
  } catch (error) {
      console.log(error)
      res.send('error')
  }
})


// Delete Movie
router.delete('/api/deletemovie/:_id',verifytoken, (req, res) => {
  Movie.findByIdAndRemove(req.params._id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      const movieName = movie.name;
      MovieBooked.deleteMany({ movie: movieName })
        .then(() => {
            res.status(200).json({ message: 'Movie deleted successfully' });
        })
        .then(()=>{
            return Review.findOneAndDelete({movie: movieName});
        })
        .then(()=>{
            return MovieBooked.findOneAndDelete({movie: movieName})
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to delete related data from MovieBooked' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete movie' });
    });
});

// Book Movie
router.put('/api/bookmovie/:_id',verifytoken, async (req, res) => {
  try {
    let id = req.params._id;
    let updateData = req.body.updatedData;
    let uemail = req.body.data1;
    let seatno = req.body.data2;
    let totalprice =req.body.data3;

    const updated = await Movie.findByIdAndUpdate(id, updateData, { new: true });

    const user = await User.findOne({ email: uemail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const movieBooked = new MovieBooked({
      username: uemail,
      movie: updateData.name,
      seats: seatno,
    });
    await movieBooked.save();

    const mailOptions = {
      from: process.env.myemail, 
      to: uemail,                        
      subject: 'Booking Confirmation',
      text: `Your booking for ${seatno} Seat(s) for ${updateData.name} (movie) is confirmed. The movie is shown on ${updateData.screen}. Total amount for booking is : Rs.${totalprice}.
      
      Thank you
      Watch Now Theatres
      +91 9999999999`, 
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

// get bookeddata
router.get('/api/bookeddata',verifytoken, async (req, res) => {
  try {
    let useremail = req.query.user;
    console.log(useremail);
    const moviesbooked = await MovieBooked.find({username:useremail});
    console.log(moviesbooked);
    res.json(moviesbooked);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Cancel booking
router.delete('/api/cancelmovie/:_id',verifytoken, (req, res) => {
  let cancelledMovie;
  let cancelledseats;
  let user;

  MovieBooked.findByIdAndRemove(req.params._id)
    .then((movie) => {
      if (movie) {
        cancelledMovie = movie.movie;
        cancelledseats = movie.seats;
        user = movie.username;
        res.status(200).json({ message: 'Movie Cancelled' });
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .then(() => {
      return Movie.findOne({ name: cancelledMovie });
    })
    .then((update) => {
      if (update) {
        update.seats += cancelledseats;
        update.seatsbooked -= cancelledseats;
        return update.save(); 
      }
    })
    .then(() => {
      const mailOptions = {
        from: process.env.myemail, 
        to: user,                        
        subject: 'Booking Cancellation',
        text: `Your booking for ${cancelledseats} Seat(s) for ${cancelledMovie} (movie) is cancelled. Booking amount will be Refunded after 5% reduction.
        
        Thank you
        Watch Now Theatres
        +91 9999999999`, 
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to cancel' });
    });
});

// Rate Movie
router.post('/api/addrating',verifytoken, (req,res)=>{
  console.log(req.body);
  const newReview=new Review({
    username: req.body.user,
    movie: req.body.movie,
    review: req.body.review,
  });
  newReview.save()
    .then(()=>{
      res.status(200).json({message:'Review Added'});
    })
    .catch((error)=>{
      res.status(500).json({error:'Failed to Add Review'});
    })
})

// Add Review
router.post('/api/addreview',verifytoken, async (req, res) => {
  try {
    const existingReview = await Review.findOne({
      username: req.body.data1,
      movie: req.body.data2,
    });

    if (existingReview) {
      return res.status(400).json({ error: 'User already reviewed this movie' });
    }

    const newReview = new Review({
      username: req.body.data1,
      movie: req.body.data2,
      review: req.body.data3,
    });

    await newReview.save();
    res.status(200).json({ message: 'Review Added' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Add Review' });
  }
});

// view all rating
router.get('/api/getrating',verifytoken,(req,res)=>{
  Review.find()
  .then((review)=>{
    res.status(200).json(review);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});

// Delete a rating
router.delete('/api/deleterating/:_id',verifytoken,(req, res) => {
  Review.findByIdAndRemove(req.params._id)
  .then((review)=>{
    if (review){
      res.status(200).json({message:'Message deleted successfully'});
    }else{
      res.status(404).json({error:'Message not found'});
    }
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to delete Message'});
  });
});


module.exports = router