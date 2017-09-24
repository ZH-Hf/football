require(["config"],function(){
	require(["zepto"],function($){
		require(["tap"],function(){
			function testLoginNum(){
				var reg=/^1(3|4|5|7|8)\d{9}$/;
				return reg.test($(".loginNum").val())
			};
			$(".loginNum").on("blur",function(){
				if(testLoginNum()){
					$(".warn_login").html("号码正确");
					$(".warn_login").css({"color":"green"});
				}else{
					$(".warn_login").html("号码错误");
					$(".warn_login").css({"color":"red"});
				}
			});
			function testPassword(){
				var reg=/^[a-zA-Z]\w{5,17}$/;
				return reg.test($(".password").val())
			}
			$(".password").on("blur",function(){
				if(testPassword()){
					$(".warn_pwd").html("密码格式正确");
					$(".warn_pwd").css({"color":"green"});
				}else{
					$(".warn_pwd").html("密码格式错误");
					$(".warn_pwd").css({"color":"red"});
				}
			});
			
			function testNickname(){
				var reg=/^[\d\w\u4e00-\u9fa5,\.;\:"'?!\-]{2,15}$/;
				return reg.test($(".nickname").val())
			}
			$(".nickname").on("blur",function(){
				if(testNickname()){
					$(".warn_nkm").html("昵称格式正确");
					$(".warn_nkm").css({"color":"green"});
				}else{
					$(".warn_nkm").html("昵称格式错误");
					$(".warn_nkm").css({"color":"red"});
				}
			});
			$("#btn").on("tap",function(e){
					e.preventDefault();
				var pass=testLoginNum()&&testNickname()&&testPassword();
				if(pass){
					var params={};
						params.username=$('.loginNum').val().trim();
						params.pwd=$('.password').val().trim();
						params.nickname=$('.nickname').val().trim();
					$.post("/api/regist",params,function(res){
						if(res.code==0){
							alert("注册成功");
							location="login.html"
						}else{
							alert("注册失败");
							return
						}
					});
				}else{
					e.preventDefault();
				}
			})
		})
	})
})