// const express = require('express');
// User = require('../modules/main');

module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Welcome !",
  });
};
