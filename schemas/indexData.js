var mongoose = require("mongoose");

var indexDataSchema = mongoose.Schema({
	imgSrc: String,
	desc: String
});

module.exports = indexDataSchema;