const express = require("express");
var router = express.Router();
const passport = require("passport");
const postAPI = require("../../../controller/api/v1/posts_api");

router.get("/", postAPI.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postAPI.destroy
); // we don't want ccokies to be stored
module.exports = router;
