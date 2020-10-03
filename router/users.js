const express = require("express");
const passport = require("passport");
//const { runInNewContext } = require('vm');
var router = express.Router();
const UserController = require("../controller/UserController");
console.log("User router loaded");
router.get("/sign_in", UserController.signin);
router.get("/sign_up", UserController.signup);
//Display profile only when logged in
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  UserController.profile
);
router.post("/create", UserController.create);
//router.post("/create_session", UserController.createSession);
router.post(
  "/create_session",
  passport.authenticate("local", { failureRedirect: "/users/sign_in" }),
  UserController.createSession
);
router.get("/sign_out", UserController.destroySession);
router.post("/update/:id", passport.checkAuthentication, UserController.update);
module.exports = router;
