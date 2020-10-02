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
};
module.exports.createSession = function (req, res) {
  //todo later
};
