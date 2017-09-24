var mongoose = require("mongoose");

var ContentSchema = mongoose.Schema({
	headImg:String,
	nickname:String,
    sign:String,
    contentPic:Array,
    contentTxt:String
})

module.exports = ContentSchema