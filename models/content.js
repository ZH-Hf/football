var mongoose = require("mongoose");
var ContentSchema = require('../schemas/content');

var Content = mongoose.model("content",ContentSchema);

module.exports = Content;