var mongoose  = require("mongoose");
var indexDataSchema = require("../schemas/indexData");

var live = mongoose.model("live",indexDataSchema);

module.exports = live;
