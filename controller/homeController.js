// const express = require('express');
// User = require('../modules/main');
const User = require("../models/user");
const Post = require("../models/post");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Sochioh : Home",
  //     post_list: posts,
  //   });
  try {
    let posts = await Post.find({}) // Finds all the posts for you
      .populate("user") // Populate the database pehle se
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    // .exec(function (err, posts) {
    //   User.find({}, function (err, users) {
    //     return res.render("home", {
    //       title: "Sochioh Home",
    //       post_list: posts,
    //       all_users: users,
    //     });
    //});
    // console.log("posts : ", posts);
    // return res.render("home", {
    //   title: "Sochioh: Home",
    //   post_list: posts,
    // });
    let users = await User.find({});

    return res.render("home", {
      title: "Sochioh Home",
      post_list: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
