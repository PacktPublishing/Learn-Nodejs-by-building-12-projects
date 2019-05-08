var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
  	res.render('users/register');
});

router.get('/login', function(req, res, next) {
  	res.render('users/login');
});

module.exports = router;
