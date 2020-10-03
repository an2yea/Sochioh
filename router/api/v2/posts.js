const express = require("express");
var router = express.Router();
const postAPI = require("../../../controller/api/v2/posts_api");

router.get("/", postAPI.index);
module.exports = router;
