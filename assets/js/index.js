require(["config"], function() {
	require(["zepto", "template", "animation", "min", "jquery", "iscroll"], function($, template) {
		require(["tap"], function() {
			$(function() {
				var Tag0 = $("#Tag0"),
					Tag1 = $("#Tag1"),
					Tag2 = $("#Tag2");
				$(".swiper-slide").height($(".container").height());
				activePage(0);
				var MyScroll = null,
					MyScroll2 = null,
					MyScroll3 = null;

				function activePage(index) {
					var slide_first = $(".info_1").children("dl"),
						slide_second = $(".info_2").children("dl"),
						slide_third = $(".info_3").children("dl");
					$.post("/api/index", function(data) {
						if(index == 0) {
							if(!slide_first.length) {
								var data1 = {
									list: data.live
								};
								var html1 = template("product_template", data1);
								$('.info_1').prepend(html1);
								//								$('.info_1').append(html1);
							}
						} else if(index == 1) {
							if(!slide_second.length) {
								var data2 = {
									list: data.life
								};
								var html2 = template("product_template", data2);
								$('.info_2').prepend(html2);
							}
						} else if(index == 2) {
							if(!slide_third.length) {
								var data3 = {
									list: data.beauty
								};
								var html3 = template("product_template", data3);
								$('.info_3').prepend(html3);
							}
						}

					})
					setTimeout(function() {
						if(!MyScroll) {
							MyScroll = new IScroll(".slide_first", {
								scrollbars: true,
								probeType: 2,
								tap: true,
							});
						}

						var flag = "",
							scrollMax = MyScroll.maxScrollY,
							$upTag = $("#upTag");
						MyScroll.on("scroll", function() {
							if(this.directionY && this.y < scrollMax - 50 && flag == "") {
								$upTag.html("释放加载！");
								flag = "up";
								this.maxScrollY = scrollMax - 50;
							}
						});
						MyScroll.on("scrollEnd", function() {
							if(!flag && this.directionY && this.y < MyScroll.maxScrollY + 40 && this.y > MyScroll.maxScrollY - 40) {
								MyScroll.scrollTo(0, MyScroll.maxScrollY, 100);
							}
							if(flag == "up") {
								$upTag.html("加载中...");
								setTimeout(function() {
									$.post("/api/index", function(data) {
										var data1 = {
											list: data.live
										};
										var html1 = template("product_template", data1);
										$('.info_1').prepend(html1);
										MyScroll.refresh();
										flag = "";
										$upTag.html("上拉加载更多！");
										scrollMax = MyScroll.maxScrollY;
									});
								}, 1000)
							}
						})
					}, 500)

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
							if(!MyScroll2 && swiper.activeIndex == 1) {
								MyScroll2 = new IScroll(".slide_second", {
									scrollbars: true,
									probeType: 2,
									tap: true,
								});

								var flag = "",
									scrollMax = MyScroll2.maxScrollY,
									$upTag1 = $("#upTag1");
								MyScroll2.on("scroll", function() {
									if(this.directionY && this.y < scrollMax - 50 && flag == "") {
										$upTag1.html("释放加载！");
										flag = "up";
										this.maxScrollY = scrollMax - 50;
									}
								});
								MyScroll2.on("scrollEnd", function() {
									if(!flag && this.directionY && this.y < MyScroll2.maxScrollY + 40 && this.y > MyScroll2.maxScrollY - 40) {
										MyScroll2.scrollTo(0, MyScroll2.maxScrollY, 100);
									}
									if(flag == "up") {
										$upTag1.html("加载中...");
										setTimeout(function() {
											$.post("/api/index", function(data) {
												var data1 = {
													list: data.life
												};
												var html1 = template("product_template", data1);
												$('.info_2').prepend(html1);
												MyScroll2.refresh();
												flag = "";
												$upTag1.html("上拉加载更多！");
												scrollMax = MyScroll2.maxScrollY;
											});
										}, 1500)
									}
								})
							}
							if(!MyScroll3 && swiper.activeIndex == 2) {
								MyScroll3 = new IScroll(".slide_third", {
									scrollbars: true,
									probeType: 2,
									tap: true,
								});

								var flag = "",
									scrollMax = MyScroll3.maxScrollY,
									$upTag2 = $("#upTag2");
								MyScroll3.on("scroll", function() {
									if(this.directionY && this.y < scrollMax - 50 && flag == "") {
										$upTag2.html("释放加载！");
										flag = "up";
										this.maxScrollY = scrollMax - 50;
									}
								});
								MyScroll3.on("scrollEnd", function() {
									if(!flag && this.directionY && this.y < MyScroll3.maxScrollY + 40 && this.y > MyScroll3.maxScrollY - 40) {
										MyScroll3.scrollTo(0, MyScroll3.maxScrollY, 100);
									}
									if(flag == "up") {
										$upTag2.html("加载中...");
										setTimeout(function() {
											$.post("/api/index", function(data) {
												var data1 = {
													list: data.beauty
												};
												var html1 = template("product_template", data1);
												$('.info_3').prepend(html1);
												MyScroll3.refresh();
												flag = "";
												$upTag2.html("上拉加载更多！");
												scrollMax = MyScroll3.maxScrollY;
											});
										}, 2000)
									}
								})
							}
						}, 600)

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