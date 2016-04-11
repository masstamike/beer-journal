/**
 * Created by masstamike on 2/21/16.
 */
// models/review.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Review', {
    username: {type: String, default: ''},
    beer : {type : String, default: ''},
    brewer : {type : String, default: ''},
    price : {type: Number, default: 0},
    sampled : {type: Date, default: Date()},
    rating : {type: Number, default: 0, min: 0, max: 5},
    notes: {type: String, default: ''},
    abv: {type: Number, default: 0},
    ibu: {type: Number, default: 0},
    servingType: {type: String, default: ''},

});
