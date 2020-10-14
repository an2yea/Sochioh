const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const { profile } = require("console");
const env = require("./environment")
//using new Strategy for google
passport.use(
  new GoogleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callbackURL,
    },
    // Refreshes to create new Token - refreshtoken
    function (acccessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in google strategy-passport", err);
          return;
        }

        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          //create the user if not found with a random password
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                // req.flash('error',"Error in creating user");
                return;
              }
              else
              {
                // user.flash('success',"Account Created !")
                return done(null, user);
              }
            }
          );
        }
      });
    }
  )
);
