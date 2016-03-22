/*
    Author: Michael Sawyer
    Date: 3/10/2016
 */
'use strict';

var express   = require('express');
var passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router    = express.Router();

// Grab the model
var Review = require ('../models/review.js');
var User   = require ('../models/user.js');

// Define title bar arguments
var titleBar = {title: 'The Beer Journal', description: 'A collaborative place for beer enthusiasts.'};

passport.use(new LocalStrategy(User.authenticate()));

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

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }),
      req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }

        passport.authenticate('local')(req, res, function() {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

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
