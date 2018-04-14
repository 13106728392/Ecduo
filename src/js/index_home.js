// 配置参数
require.config({
	// baseUrl:'lib',

	// 配置别名（虚拟路径）
	paths: {
		// 格式：别名:真实路径（基于baseUrl）
		jquery: '../lib/jquery-3.2.1',
		cars: '../lib/ft-carousel.min',
		common: '../lib/common'
	},

	// 配置依赖
	shim: {
		cars: ['jquery']
	}
})

require(['jquery', 'cars', 'common'], function($) {

	jQuery(function($) {
		//加载头部
		$('.EC_header').load('html/base_header.html');
		$('.EC_footer').load('html/base_footer.html');

		//加载二级菜单
		let $lis = $('.nav_mian_l').children('ul').children('li');
		$lis.each(function(ele, item) {
			$(item).children('.nav_other').load('html/nav_other_pics.html')
		})

		//轮播图
		$("#carousel_1").FtCarousel();
		$("#carousel_2").FtCarousel();
		$('#carousel_3').FtCarousel();

		//导航栏右边的tab标签切换
		let $nav_mian_right_cotent = $('.nav_mian_right_cotent');
		let $tabItem = $nav_mian_right_cotent.children('header').children('div');
		let $tabContent = $nav_mian_right_cotent.children('.contents').children('div');
		//初始化
		$tabItem.eq(0).addClass('active');
		$tabContent.eq(0).siblings('div').hide();

		$tabItem.eq(1).on('mouseover', function() {
			$tabItem.eq(1).addClass('active');
			$tabItem.eq(0).removeClass('active');
			$tabContent.eq(0).hide(500).siblings('div').show(500);
		})
		$tabItem.eq(0).on('mouseover', function() {
			$tabItem.eq(0).addClass('active');
			$tabItem.eq(1).removeClass('active');
			$tabContent.eq(0).show(500).siblings('div').hide(500);
		})

		//生成下面的多商品牌店
		let ulpic = ["img/more1.jpg", "img/more2.jpg", "img/more3.jpg", "img/more4.jpg", "img/more5.jpg", "img/more6.jpg", "img/more7.jpg", "img/more8.jpg", "img/more9.jpg", "img/more10.jpg", "img/more11.jpg", "img/more12.jpg",
			"img/more13.jpg", "img/more14.jpg", "img/more15.jpg", "img/more16.jpg", "img/more17.jpg", "img/more18.jpg", "img/more19.jpg", "img/more20.jpg"
		]
		let $more_pic = $('.more_pic');
		$more_pic.append('<ul/>')
		for(let i = 0; i < ulpic.length; i++) {
			$more_pic.children('ul').append('<li/>');
			let $lis = $more_pic.children('ul').children('li');
			$lis[i].innerHTML = `<div class="li_first"><img src="${ulpic[i]}"/></div><div class="li_sec"><h3>蚂蚁贷款</h3><a href="../html/list.html">点击进入</a>	</div>`;
		}

		let $every_goods = $('.every_goods');
		$every_goods.load('html/every_goods.html')

		$.ajax({
			url: "api/every_goods.php",
			success: function(data) {
				let datas = JSON.parse(data);
				$every_goods.map(function(idx, item) {
					let ul1 = item.children[2].children[0];
					item.children[0].children[0].innerHTML = `${idx+1}F`;
					item.children[3].src = `img/goodsl${idx+1}.jpg`;
					item.children[4].src = `img/goodsl${idx+1}${idx+1}.jpg`;
					for(let i = 0; i < 8; i++) {
						console.log()
						$(ul1).append(`<li><a href="../html/goods.html?id=${i+1}"><img src="${datas[i].imgurl}" /></a> 
								<h3><a href="#">${datas[i].name}</a></h3>
							<span>分销价</span>
							<span class="salesprice">￥${datas[i].salesprice}</span></li>`);
					}
				})
			}
		})

		let $fixboxs = $('.fixboxs');
		$fixboxs.on('click', function() {
			$("html,body").animate({
				scrollTop: 0
			}, 1000);
		})

		//获得不到元素
		let please_btn;
		let del_login;
		hascookie();
		//检查是否有cookie
		function hascookie() {
			let telcook = Cookie.get('tel');
			if(telcook == undefined) {
				return;
			}
			if(telcook.length > 0) {
				setTimeout(() => {
					let top_user = document.querySelector('#top_user');
					please_btn = document.querySelector('#please_btn');
					del_login = document.querySelector('#del_login');

					del_login.style.display = 'inline-block';
					please_btn.style.display = 'none';

					top_user.innerHTML = telcook;
				}, 1000);
			}
		}

		setTimeout(() => {
		if(del_login == undefined) {
				return;
			} else {
				del_login.onclick = () => {
					Cookie.remove('tel', '/');
					console.log(666)
					$('.EC_header').load('html/base_header.html');
				}
			}
		}, 1000)

	})
})