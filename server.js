var express = require('express'); //获取express构造函数
var querystring = require("querystring");
var bodyParser = require('body-parser'); //作为express的插件
var mongoose = require("mongoose"); //导入mongoose库
var fs = require("fs");
var app = express();

//链接数据库

mongoose.connect('mongodb://localhost:27017/football'); //第一块内容是协议，第二块内容是协议和端口，第三块你链接的数据库
//需要一个链接正常的反馈
var db = mongoose.connection //获取数据库链接对象

db.once('open', function() {
	console.log("数据库链接成功！");
})

//导入user model

var User = require('./models/user');
var live = require('./models/live');
var life = require('./models/life');
var beauty = require('./models/beauty');

app.use(express.static('assets')) //指定静态资源路径

app.use(bodyParser.json()) //告诉express你使用了插件
app.use(bodyParser.urlencoded({

	extended: true
})) //处理通过表单提交的数据，放到req对象上面去了

app.post('/api/regist', function(req, res) {
	console.log(req.body);

	//先去查一下次，如果返回的值不是空，说明注册过了

	var u = new User({ //创建一个model 实例
		username: req.body.username,
		pwd: req.body.pwd,
		nickname: req.body.nickname
	});

	u.save(function(err, user) {
		if(err) {
			return
		};
		res.json({ //返回前端一个json对象
			code: 0,
			msg: "注册成功！"
		});
	});

})

app.post('/api/login', function(req, res) {
	var {
		username,
		pwd
	} = req.body; //对象解构
	User.find({ //对象的简写
		username,
		pwd
	}, function(err, doc) {
		console.log(doc)
		if(err) {
			return
		};
		if(doc.length) {
			res.json({
				code: 0,
				msg: "登陆成功！"
			})
		} else {
			res.json({
				code: 1,
				msg: "用户名/密码错误"
			})
		};
	}) //对象的简写

})
//将文本写入数据库
app.post("/api/loadSave", function(req, res) {
	fs.readFile("indexDB.json", function(err, data) {
		if(err) {
			return console.error(err);
		}
		var txt = data.toString();
		var obj = JSON.parse(txt);
		console.log(obj);
		//待续----------------------------------

		for(var i = 0, len = obj.live.length; i < len; i++) {
			var _live = new live({
				"imgSrc": obj.live[i].imgSrc,
				"desc": obj.live[i].desc
			}).save();
		}
		for(var i = 0, len = obj.life.length; i < len; i++) {
			var _life = new life({
				"imgSrc": obj.life[i].imgSrc,
				"desc": obj.life[i].desc
			}).save();
		}
		for(var i = 0, len = obj.beauty.length; i < len; i++) {
			var _beauty = new beauty({
				"imgSrc": obj.beauty[i].imgSrc,
				"desc": obj.beauty[i].desc
			}).save();
		}

	})
	res.json({
		msg: "导入数据成功"
	})
})

//返回首页的请求
app.post("/api/index", function(req, res) {
	var xxxxxxx = {};
	beauty.find({}, function(err, doc) {
		xxxxxxx.beauty = doc;
	});
	live.find({}, function(err, doc) {
		xxxxxxx.live = doc;
	});
	life.find({}, function(err, doc) {
		xxxxxxx.life = doc;
	});
	setTimeout(function(){
		res.json(xxxxxxx);
	},200)
})

app.listen(8080, function() {
	console.log("创建成功！")
})