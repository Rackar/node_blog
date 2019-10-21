var express = require('express');
var router = express.Router();

var add = require("./add");
var addArticle = require("./addArticle");
var user = require('./user')
var avatar = require('./getUserAvatar')
/* GET users listing. */

router.post('/', add);
router.post('/article', addArticle);
router.get('/:id', user)
router.get('/avatar/:id', avatar)



module.exports = router;