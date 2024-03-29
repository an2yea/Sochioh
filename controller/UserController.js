const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comments");
const Like = require("../models/likes");
const fs = require("fs");
const path = require("path");
const SignUp_mailer = require('../mailers/signup_mailer');
module.exports.profile = async function (req, res) {
  user = await User.findById(req.params.id);
  return res.render("profile", {
    title: "User Profile",
    profile_user: user,
  });
};
module.exports.destroy = async function(req,res)
{
  try{
  let user = await User.findById(req.params.id);
  console.log("body :::", req.body);
  console.log(user.id , " " , req.user.id);
  if(user.id == req.user.id)
  {

      console.log("ID's match");
      
      await Like.deleteMany({user : user});
      console.log("Likes deleted");
      await Comment.deleteMany({user: user});
      console.log("Comments deleted");
      await Post.deleteMany({user : user});
      console.log("Posts deleted");
      
      user.remove();
      console.log("User Deleted")
      req.flash('success',"Account Deleted");
      return res.redirect('/');
  }
  } catch(err)
    {
        console.log("Don't match");
        res.redirect('back');
    }
  console.log("vbiaberiagb");
  return res.redirect('/');
}
module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     return res.redirect("back");
  //   });
  // } else {
  //   return res.status(401).send("Unauthorised");
  // }
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploaded_avatar(req, res, function (err) {
        if (err) {
          console.log("Multer error !!!!!!!!!");
        }
        // console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          //saves the path of uploaded file
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname + ".." + user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        req.flash("success", "User Profile Updated");
        return res.redirect("back");
      });
    } catch {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorised");
    return res.status(401).send("Unauthorised");
  }
};
module.exports.signin = function (req, res) {
  //passport.js
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  console.log("signin controller reached ");
  return res.render("signin", {
    title: "Sign in",
    layout : false
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
        SignUp_mailer.newAccount(user);
        console.log("user created with signup ");
        return res.redirect("/users/sign_in");
      });
    } else {
      return res.redirect("/");
    }
  });
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged In Successfully");
  let user = User.find({email : req.body.email})
  SignUp_mailer.newAccount(user);

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
  req.flash("success", "You have logged out");
  req.logout(); //Passport.js
  // req.flash("success", "You have logged out");
  return res.redirect("/"); //transferring messge to res
};
