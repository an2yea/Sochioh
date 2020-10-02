const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../modules/user");
//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid username/password --> passport");
          return done(null, user);
        }
        return done(null, user);
      });
    }
  )
);

//serialising user ti decide which key to keep in cookies encrypting
passport.serializeUser(function (user, done) {
  done(null, user);
});

//deserialising user from keys in cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user");
      return done(err);
    }
    return done(null, user);
  });
});
//acts as Middleware
passport.checkAuthentication = function (req, res, next) {
  //if user is signed in pass on to next function
  if (req.isAuthenticated()) {
    return next();
  }
  //if not signed in
  return res.redirect("/users/sign_in");
};
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user; //sent to response locals , req,user contains curretn signed in user
  }
  next();
};
module.exports = passport;
