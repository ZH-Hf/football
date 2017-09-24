var mongoose = require("mongoose");
var UserSchema = require('../schemas/user');

var User =  mongoose.model('user',UserSchema) //第一个参数是集合的名称

module.exports = User;