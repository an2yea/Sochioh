const express = require("express");
const router = express.Router();
const LikesController = require("../controller/likesController");

router.post("/toggle", LikesController.toggleLike);

module.exports = router;
