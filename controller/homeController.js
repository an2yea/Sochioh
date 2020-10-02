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
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Sochioh: Home",
        post_list: posts,
      });
    });
};
