var mongoose  = require("mongoose");
var indexDataSchema = require("../schemas/indexData");

var life = mongoose.model("livelihood",indexDataSchema);

module.exports = life;
