const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const { profile } = require("console");

//usig new Strategy for google
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "248928157103-q2n6r3969gu3mi2esodl5dvb9jbr4rc6.apps.googleusercontent.com",
      clientSecret: "ivPfysFZH9m_neY4seFY4Ob6",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
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
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user");
                return;
              }
            }
          );
        }
      });
    }
  )
);
