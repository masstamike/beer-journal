/*
    Author: Michael Sawyer
    Date: 3/10/2016
 */
'use strict';

var express   = require('express');
var passport  = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var router    = express.Router();

// Grab the models
var Review = require ('../models/review.js');
var User   = require ('../models/user.js');

// Load Secrets
var SECRETS = require('../helpers/secrets.json');

// Credentials
var GOOGLE_CLIENT_ID            = SECRETS.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET        = SECRETS.GOOGLE_CLIENT_SECRET;
var GOOGLE_CLIENT_CALLBACK_URL  = SECRETS.GOOGLE_CLIENT_CALLBACK_URL;

// Define title bar arguments
var titleBar = {title: 'The Beer Journal', description: 'A collaborative place for beer enthusiasts.'};

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:  GOOGLE_CLIENT_CALLBACK_URL,
    passReqToCallback   : true
  }, function(request, accessToken, refreshToken, profile, done) {
    var user = new User({
        user_id: profile.id,
        email: profile.email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        imageUrl: profile.photos[0].value
    });

    user.save();
    done(undefined, user);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  User.findOne({'user_id': user.id}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = "anonymous";
  if (req.user) {
      username = req.user.firstName;
  }
  titleBar.username = username;
  res.render('index', titleBar);
});

router.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
  ));

router.get('/auth/google/callback',
  passport.authenticate( 'google', {
    // successRedirect: '/auth/google/success',
    successRedirect: '/',
    failureRedirect: '/auth/google/failure'
  }));

router.get('/auth/google/success', function(req, res) {
  res.send('success!');
});

router.get('/auth/google/failure', function(req, res) {
  res.send('failure!');
});

router.post('/user/register', function(req, res) {
  User.register(new User({ username : req.body.username }),
      req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }

        passport.authenticate('passport-google-oauth')(req, res, function() {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
});

router.post('/user/login', function(req, res, next) {
  passport.authenticate('passport-google-oauth', function(err, user, info) {
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
        status: 'Login successful!',
        user: user.username
      });
    });
  })(req, res, next);
});

router.post('/user/logout', function(req, res) {
  req.logout();
  res.status(200).json({
      status: 'Logout successful!'
  });
});

router.get('/user/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true,
    user: req.user.email
  });
});

router.post('/reviews/new', function (req, res) {
  var review = new Review ({
    username    : req.user.email,
    userFirst   : req.user.firstName,
    userLast    : req.user.lastName,
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

router.get('/reviews/all', function (req, res) {
  Review.find({}).exec(function(err, results) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

router.get('/reviews/:username', function(req, res) {
  Review.find({"username": req.params.username}).exec(function(err, results) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

module.exports = router;
