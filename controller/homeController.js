// const express = require('express');
// User = require('../modules/main');

const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Sochioh : Home",
  //     post_list: posts,
  //   });
  // }); // this is two lectures before that, so no right ? no
  // have you been taught about async /await ??
  // show me your robo3t
  // why have you created user field ??? In ? users collection
  Post.find({}) // Finds all the posts for you
    .populate("user") // Populate the databse pehle se
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      console.log("posts : ", posts);
      return res.render("home", {
        title: "Sochioh: Home",
        post_list: posts,
      });
    });
};
