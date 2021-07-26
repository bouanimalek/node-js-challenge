const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require("../models/userSchema");

passport.use(
  new BearerStrategy(function (token, done) {
    User.findOne({ _id: token }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: "all" });
    });
  })
);
