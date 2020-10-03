const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};
module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
};
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  console.log("signin controller recached ");
  return res.render("signin", {
    title: "Sign in",
  });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signup", {
    title: "Sign Up !",
  });
  //return res.redirect("/");
};
module.exports.create = function (req, res) {
  console.log(req.body.name);
  //todo later
  console.log("create controller reached ");
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  console.log("passwords match");
  //   console.log("req body ", req.body);
  User.findOne({ email: req.body.email }, function (err, user) {
    console.log("loaderd");
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    // console.log("user :", user);
    // console.log("inside findone");
    // console.log("user : ", user);

    if (!user) {
      console.log("User not found so creating a user ");
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user");
        }
        console.log("user created with singup ");
        return res.redirect("/users/sign_in");
      });
    } else {
      return res.redirect("/");
    }
  });
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};
//sign in and creating user
// module.exports.createSession = function (req, res) {
//   //find user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("Error in signing up");
//     }
//     //handle user found
//     if (user) {
//         //handle mismatching password
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       //create session
//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {  //handle user not found
//       return res.redirect("back");
//     }
//   });

// };
module.exports.destroySession = function (req, res) {
  req.logout(); //Passport.js
  req.flash("success", "You have logged out");
  return res.redirect("/"); //transferring messge to res
};
