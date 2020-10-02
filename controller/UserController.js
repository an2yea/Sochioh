const User = require("../modules/user");

module.exports.profile = function (req, res) {
  //   return res.render("profile"); // Works ? haan still loading :(, o
  return res.send("hello profile page");
};
module.exports.signin = function (req, res) {
  //   res.render("signin", { //.. shouldn't we return here ?
  //     title: "Sign In !!",
  //   });
  console.log("signin controller recached ");
  //   return res.redirect("/users/profile");
  res.render("signin", {
    title: "Sign in",
  });
};

module.exports.signup = function (req, res) {
  return res.render("signup", {
    title: "Sign Up !",
  });
  return res.redirect("/");
};
module.exports.create = function (req, res) {
  console.log(req.body.name);
  //todo later
  console.log("create controller reached ");
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("/");
  }

  console.log("passwords match");
  //   console.log("req body ", req.body);
  User.findOne({ email: req.body.email }, function (err, user) {
    console.log("loaderd"); // Any luck ?
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    // console.log("user :", user);
    // show me mongodb
    // why is your code not pring this console statement ??? Only if I knew, nice wait let me check
    // console.log("inside findone");
    // console.log("user : ", user);

    //ek second
    //ok//purana code comment kardo delete karne ki jagah toh dikh jaayega mujhe bhi error better tareeke se..ok
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

//sign in and creating user
module.exports.createSession = function (req, res) {
  //find user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in signing up");
    }
    //handle user found
    if (user) {
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      return res.redirect("back");
    }
  });

  //handle mismatching password
  //create session
  //handle user not found
};
// hwere is the handler for create_seession ????
