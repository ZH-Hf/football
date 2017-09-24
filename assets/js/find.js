require(["config"],function(){
	require(["zepto"],function($){
		require(["tap"],function(){
			$(function(){
				
			
			$("#index").on("tap",function(){
				location="index.html"
			});
			$("#self").on("tap",function(){
				location="self-center.html"
			});
			})
		})
	})
})