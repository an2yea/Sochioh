const express = require("express");
//const { runInNewContext } = require('vm');
var router = express.Router();
const UserController = require("../controller/UserController");
console.log("User router loaded");
router.get("/sign_in", UserController.signin);
router.get("/sign_up", UserController.signup);
router.get("/profile", UserController.profile);
// where is the route /users/porfile ?? //ohh i see that's the problem jjust a sec
router.post("/create", UserController.create);
router.post("/create_session", UserController.createSession);

module.exports = router;
