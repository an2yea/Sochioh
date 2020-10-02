// const express = require('express');
// User = require('../modules/main');

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  return res.render("home", {
    title: "Welcome !",
  });
};
