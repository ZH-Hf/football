require(["config"], function() {
	require(["zepto", "template", "animation", "min", "jquery"], function($, template) {
		require(["tap", "iscroll"], function() {
			$(function() {
				var Tag0 = $("#Tag0"),
					Tag1 = $("#Tag1"),
					Tag2 = $("#Tag2");
				$(".swiper-slide").height($(".container").height());
				activePage(0);

				function activePage(index) {
					var slide_first = $(".info_1").children("dl"),
						slide_second = $(".info_2").children("dl"),
						slide_third = $(".info_3").children("dl");
					$.post("/api/index", function(data) {
						console.log(data);
						if(index == 0) {
							if(!slide_first.length) {
								var data1 = {
									list: data.live
								};
								var html1 = template("product_template", data1);
								$('.info_1').append(html1);
								//								$('.info_1').append(html1);
							}
						} else if(index == 1) {
							if(!slide_second.length) {
								var data2 = {
									list: data.life
								};
								var html2 = template("product_template", data2);
								$('.info_2').append(html2);
							}
						} else if(index == 2) {
							if(!slide_third.length) {
								var data3 = {
									list: data.beauty
								};
								var html3 = template("product_template", data3);
								//								console.log(html3);
								$('.info_3').append(html3);
							}
						}

					})
					setTimeout(function() {
						//						console.log("滚动层高度：" + $(".info_1").height());
						//						console.log("包裹层高度：" + $(".slide_first").height());
						var MyScroll = new IScroll(".slide_first", {
							scrollbars: true,
							//								startY:31
							//								maxScrollY:$(".info_1").height()+88
						});
						//						console.log(MyScroll)
					}, 200)

				};
				var scrollHeight = $(".info_1").height();
				var mySwiper = new Swiper('#swipe_one', {
					paginationClickable: true,
					//paginationElement: "li",
					bulletActiveClass: "pActive",
					bulletClass: "pageItem",
					lazyLoading: true,
					onSlideChangeStart: function(swiper) {
						activePage(swiper.activeIndex);
						setTimeout(function() {
							//							console.log("滚动层高度----------：" + $(".info_2").height());
							//							console.log("包裹层高度----------：" + $(".slide_second").height());
							var MyScroll2 = new IScroll(".slide_second", {
								scrollbars: true,
								//								maxScrollY:684
							});
							var MyScroll3 = new IScroll(".slide_third", {
								//								scrollbars:true
							});
						}, 200)

					},
					paginationBulletRender: function(swiper, index, className) {
						var arr = ["足球现场", "足球生活", "足球美女"];
						return '<span class="' + className + '" id="Tag' + index + '">' + arr[index] + '</span>';
					},
					// 如果需要分页器
					pagination: '.swiper-pagination',

				});
				var hot_atten = $("header").children("span"),
					section = $(".container");
				for(let i = 0; i < hot_atten.length; i++) {
					hot_atten.eq(i).on("tap", function() {
						for(var j = 0; j < hot_atten.length; j++) {
							hot_atten.eq(j).css({
								"background": "#3dd067",
								"color": "#a3e9b7"
							})
							hot_atten.eq(i).css({
								"background": "#64d985",
								"color": "white"
							})
							section.eq(j).css({
								"display": "none"
							})
							section.eq(i).css({
								"display": "block"
							})
						}
					})
				};
				/*$("header span").eq(0).on("tap",function(){
					;
				})*/

				$("#self").on("tap", function() {
					location = "self-center.html"
				});
				$("#find").on("tap", function() {
					location = "find.html"
				});

			})
		})
	})
})