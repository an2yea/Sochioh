// const express = require('express');
// User = require('../modules/main');

const Post = require("../modules/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Sochioh : Home",
  //     post_list: posts,
  //   });
  // });
  //Populate user of each post
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Sochioh: Home",
        post_list: posts,
      });
    });
};
