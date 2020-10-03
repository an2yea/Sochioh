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
