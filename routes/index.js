var express = require('express');
var router = express.Router();

// Grab the model
var Review = require ('../models/review.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Beer Journal', description: 'A collaborative place for beer enthusiasts.' });
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
