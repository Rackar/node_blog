var express = require('express');
var router = express.Router();
var login = require("./login");
var signup = require("./signup");
/* GET users listing. */
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;