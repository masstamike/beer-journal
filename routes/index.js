var express   = require('express');
var passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router    = express.Router();

// Grab the model
var Review = require ('../models/review.js');
var User   = require ('../models/user.js');

// Define title bar arguments
var titleBar = {title: 'The Beer Journal', description: 'A collaborative place for beer enthusiasts.'};

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findByUsername(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', titleBar);
});

router.get('/login', function(req, res, next) {
  res.render('login', titleBar);
})

router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  ));

router.post('/reviews/new', function (req, res) {
  var review = new Review ({
    beer        : req.body.beerName,
    brewer      : req.body.brewer,
    price       : req.body.price,
    sampled     : req.body.sampleDate,
    rating      : req.body.rating,
    notes       : req.body.notes,
    abv         : req.body.abv,
    ibu         : req.body.ibu,
    servingType : req.body.servingType
  });

  review.save();
  res.json(review);
});

module.exports = router;
