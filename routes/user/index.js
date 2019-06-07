var express = require('express');
var router = express.Router();
var login = require("./login");
var signup = require("./signup");
var user = require('./user')
var avatar = require('./getUserAvatar')
/* GET users listing. */
router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', user)
router.get('/avatar/:id', avatar)

module.exports = router;