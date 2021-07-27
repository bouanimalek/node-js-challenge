const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// passport
router.get("/profile", passport.authenticate("bearer", { session: false }), (req, res)  =>{
    res.json(req.user);
});

// create registerApi(check if email is already used)
router.post('/register', async(req, res) => {
  const userVerify = await User.findOne({
    email: req.body.email
  });
  if(userVerify){
    res.status(400).json({message: 'Failed! Email already in use!'});
  } else {
    const newUser = await User.create(req.body);
    res.status(201).json({message: 'User created successfully', user: newUser});
  }
})

// login with jwt
router.post("/login", async (req, res) => {
  const userDb = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (userDb) {
    // create jwt token
    const tokenData = {
        userId: userDb._id,
        email: userDb.email,
        firstname: userDb.firstname,
        lastname: userDb.lastname
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,  { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token: token });
  }else {
      res.status(400).json({message: 'Wrong credentials'});
  }
});

// api verify token(manuel, without passport)
router.post("/verifyToken", verifyToken, (req, res) => {
    
    console.log(req.user); //receive user
res.json({message: 'authorisation successfully', connectedUser: req.user});
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, async(err, authData) => {
        if (err) {
            // console.log(err);
          res.status(403).json({message: 'token expired or jwt malformed'});
        } else {
          //console.log(authData);
          // find user
          const userFound = await User.findById(authData.userId);
          req.user = userFound; // send user to the next handler
          //console.log(userFound);
          next(); // pass to next handler
        }
      });
  } else {
    res.status(403).json({message: 'invalid token'}); //forbiden
  }
}

module.exports = router;
