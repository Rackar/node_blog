var express = require('express');
var router = express.Router();
var login = require("./login");
var signup = require("./signup");
var user = require('./user')
var avatar = require('./getUserAvatar')
/* GET users listing. */
router.post('/signup', signup);
router.post('/login', login);



/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - user
 *     description: Returns a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Puppy's id
 *         in: path
 *         type: string
 *         default: 5cfbe13d0439aa1ef81f83e9
 *     responses:
 *       200:
 *         description: An json of user
 *         schema:
 *           $ref:'#/definitions/user'
 *       404:
 *         description: The Person does not exists.
 */

/**
 * @swagger
 * definitions:
 *   user:
 *     required:
 *       - id
 *     properties:
 *       username:
 *         type: string
 *       mobile:
 *         type: string
 *       data:
 *         type: string 
 */
router.get('/:id', user)
router.get('/avatar/:id', avatar)



module.exports = router;