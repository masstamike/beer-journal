/**
 * Created by masstamike on 3/8/16.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    user_id:    String,
    email:      String,
    firstName:  String,
    lastName:   String,
    imageUrl:   String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);