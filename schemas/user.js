//是一种映射 一种以文件形式存储数据库模型骨架，建立一个映射（与数据库集合属性对于的映射）

var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({ 
    username: String,
    pwd:String,
    nickname:String
});

module.exports = UserSchema