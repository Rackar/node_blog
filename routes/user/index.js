var express = require('express');
var router = express.Router();
var login = require("./login");
var signup = require("./signup");
var user = require('./user')
/* GET users listing. */
router.post('/signup', signup);
router.post('/login', login);
router.get('/:id',user)

module.exports = router;