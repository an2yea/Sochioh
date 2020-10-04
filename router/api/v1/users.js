const express = require("express");
var router = express.Router();
const UserAPI = require("../../../controller/api/v1/users_api");
router.post("/create_session", UserAPI.createSession);
module.exports = router;
