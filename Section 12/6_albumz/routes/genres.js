var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var fbRef = new Firebase('https://albumz01.firebaseio.com/');

router.get('/', function(req, res, next) {
  	var genreRef = fbRef.child('genres');

	genreRef.once('value', function(snapshot){
		var genres = [];
		snapshot.forEach(function(childSnapshot){
			var key = childSnapshot.key();
			var childData = childSnapshot.val();
			genres.push({
				id: key,
				name: childData.name
			});
		});
		res.render('genres/index',{genres: genres});
	});
});

router.get('/add', function(req, res, next) {
  	res.render('genres/add');
});

router.post('/add', function(req, res, next) {
  	var genre = {
  		name: req.body.name
  	}

  	var genreRef = fbRef.child('genres');
  	genreRef.push().set(genre);

  	req.flash('success_msg', 'Genre Saved');
  	res.redirect('/genres');
});

module.exports = router;
