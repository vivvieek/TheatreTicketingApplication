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
// POST: Upload item with description and image
router.post('/addmovie', (req, res) => {
  console.log(req.body);
  const newMovie = new Movie({
    name:req.body.name,
    category:req.body.category,
    language:req.body.language,
    cast:req.body.cast,
    description:req.body.description,
    rating:req.body.rating,
    seats:req.body.seats,
    price:req.body.price,
    screen:req.body.screen,
    image:req.body.image
  });

  newMovie.save().then((createdItem) => {
    res.status(201).json({
      message: 'Item added successfully',
      item: createdItem,
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Item creation failed',
      error: error,
    });
  });
});







// const storage = multer.diskStorage({
//   destination: (req ,file , cb) => {
//       cb(null , directory)
//   },
//   filename: (req , file ,cb) => {
//       const filename = file.originalname.toLowerCase().split(' ').join('-')
//       cb(null , filename)
//   }
// })

// var upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true)
//     } else {
//       cb(null, false)
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
//     }
//   },
// })

// router.post('/addmovie', upload.single('image'),async (req, res) => {
//   try {
//     const {name,category,language,cast,description,rating,seats,price,screen} = req.body;
//     const image = {
//       data: req.file.buffer,
//       contentType: req.file.mimetype
//     };
//     const newMovie = new Movie({
//       name,
//       category,
//       language,
//       cast,
//       description,
//       rating,
//       seats,
//       price,
//       screen,
//       image,
//     });
//     await newMovie.save()
//     res.status(200).json({ message: 'Movie Added' });
//   } catch (err) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// router.post('/addmovie', (req, res) => {
//   upload.single('image')(req, res, function (err) {
//     try {
//       if (err) {
//         return res.status(400).json({ error: 'File upload failed.' });
//       }

//       const { name, category, language, cast, description, rating, seats, price, screen } = req.body;

//       const image = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype
//       };

//       const newMovie = new Movie({
//         name,
//         category,
//         language,
//         cast,
//         description,
//         rating,
//         seats,
//         price,
//         screen,
//         image,
//       });

//       newMovie.save()
//         .then(() => {
//           res.status(200).json({ message: 'Movie Added' });
//         })
//         .catch((error) => {
//           res.status(500).json({ error: 'Failed to add Movie' });
//         });
//     } catch (err) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// });

// router.post('/addmovie',upload.single('image'),(req,res)=>{
//   console.log(req.body);
//   const newMovie=new Movie({
//     name:req.body.name,
//     category:req.body.category,
//     language:req.body.language,
//     cast:req.body.cast,
//     description:req.body.description,
//     rating:req.body.rating,
//     seats:req.body.seats,
//     price:req.body.price,
//     screen:req.body.screen,
//     image:req.body.image
//   });
//   newMovie.save()
//     .then(()=>{
//       res.status(200).json({message:'Movie Added'});
//     })
//     .catch((error)=>{
//       res.status(500).json({error:'Failed to Movie'});
//     })
// })
  





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