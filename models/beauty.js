var mongoose  = require("mongoose");
var indexDataSchema = require("../schemas/indexData");

var beauty = mongoose.model("beauty",indexDataSchema);

module.exports = beauty;
