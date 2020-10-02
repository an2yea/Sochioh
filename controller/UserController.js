const User = require("../modules/user");

module.exports.signin = function (req, res) {
  res.render("signin", {
    title: "Sign In !!",
  });
};

module.exports.signup = function (req, res) {
  res.render("signup", {
    title: "Sign Up !",
  });
};

//get sign up data
module.exports.create = function (req, res) {
  //todo later
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("/");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user");
        }
        return res.redirect("/users/sign_in");
      });
    } else {
      return res.redirect("/");
    }
  });
};

//sign in and creating user
module.exports.createSession = function (req, res) {
  //todo later
};
