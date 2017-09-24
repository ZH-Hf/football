require(["config"],function(){
	require(["zepto","animation","min"],function($){
		require(["tap"],function(){
		$(function(){
		  var mySwiper = new Swiper ('#swipe_one', {
		    paginationClickable:true,
		    paginationElement:"li",
		    bulletActiveClass:"pActive",
		    bulletClass:"pageItem",
		    lazyLoading:true,
		    onInit(swiper){
		    	swiperAnimateCache(swiper); //隐藏动画元素 
                swiperAnimate(swiper); //初始化完成开始动画
		    },
		    onSlideChangeEnd(swiper){
		    	swiperAnimate(swiper);
		    },
		      paginationBulletRender: function (swiper, index, className) {
		      	var arr=["照片（1）","关注（3）","粉丝（8）"];
      return '<span class="' + className + '">' + arr[index] + '</span>';
  },
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    

		  });
		$("#index").on("tap",function(){
			location="index.html"
		});
		$("#find").on("tap",function(){
			location="find.html"
		})
})
				})
			})
		})