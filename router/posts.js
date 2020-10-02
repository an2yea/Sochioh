const express = require("express");
//const { runInNewContext } = require('vm');
const router = express.Router();

const Postcontroller = require("../controller/postController");
// give me  a walkthrough
// of the problem or the code ?
// Basically when i call in the sign up page and enter the details, it loads but doesn;t display anything
router.post("/create", Postcontroller.create);
module.exports = router;
