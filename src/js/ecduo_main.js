// 配置参数
require.config({
	// baseUrl:'lib',

	// 配置别名（虚拟路径）
	paths: {
		// 格式：别名:真实路径（基于baseUrl）
		jquery: '../lib/jquery-3.2.1',
	},

	// 配置依赖
	//	shim:{
	//		xzoom:['jquery']
	//	}
})

require(['jquery'], function($) {
	//列表页
	jQuery(function($) {
		$('.EC_header').load('base_header.html ');
		$('.EC_footer').load('base_footer.html');

		let $contents_goods = $('.contents_goods');
		//加载页面的切换page
		let $contents_goods_bottom = $('.contents_goods_bottom');

		function createlis(datas) {
			let $ul = $contents_goods.children('ul');
			$ul.html('');
			$ul[0].innerHTML = datas.map(function(item) {
				return `<li data-id=${item.id}><a href="goods_details.html?id=${item.id}"><img src="../${item.imgurl}"/></a>
					<span class="sales_pic"></span>
					 	<h3>￥<span>${item.price}</span></h3>
					 	<h4>建议零售价：￥ <span>${item.salesprice}</span></h4>
					 	<p><a href="goods_details.html?id=${item.id}">${item.name}</a></p>
					 	<h5><a href="#">瓦费熊</a> <img src="../img/bottompics1.png" alt="" /></h5></li>`
			}).join('');
		}

		//加载页面商品的ajax

		$.ajax({
			url: "../api/ecduo_main_choose.php",
			data: {
				fisttime: 1,
				qty: 20,
				page: 1
			},
			success: function(data) {
				let res = JSON.parse(data);
				createlis(res.data);
				$contents_goods_bottom.html('');
				$contents_goods_bottom.append('<ul/>');
				let len = res.total / res.data.length
				for(let i = 0; i < len; i++) {
					$contents_goods_bottom.children('ul').append(`<li><a href="#" class="ass">${i+1}</a></li>`);
				}
			}
		});

		let ss = document.getElementsByClassName('ass');
		let firstss = ss[0];
		console.log(firstss)
		//page标签切换
		$contents_goods_bottom.on('click', 'a', function() {
			for(var i = 0; i < ss.length; i++) {
				$(ss[i]).removeClass('active');
			}
			$(this).addClass('active');
			let thisa = $(this).html(); 
			$.ajax({
				url: "../api/ecduo_main_choose.php",
				data: {
					'fisttime': 1,
					'qty': 20,
					'page': thisa
				},
				success: function(data) {
					let res = JSON.parse(data);
					createlis(res.data);
				}
			});
		})   

		//右边的ajax加载，这里的商品是不变的
		let $right_goods = $('.right_goods');
		$.ajax({
			url: "../api/ecduo_main.php",
			data: {
				qty: 6,
				page: 4
			},
			success: function(data) {
				let res = JSON.parse(data);
				let datas = res.data;
				let $ul = $right_goods.children('ul');
				$ul.html('');
				for(let i = 0; i < datas.length; i++) {
					$ul.append('<li/>');
					$ul.children('li')[i].innerHTML = (`<a href="#"><img src="../${datas[i].imgurl}"/></a>
						<span class="sales_pic"></span>
					 	<h3>￥<span>${datas[i].price}</span></h3>
					 	<h4>建议零售价：￥ <span>${datas[i].salesprice}</span></h4>
					 	<p><a href="#">${datas[i].name}</a></p>
					 	<h5><a href="#">瓦费熊</a> <img src="../img/bottompics1.png" alt="" /></h5>`)
				}
			}
		});

		function allcolor() {
			$left_choose_top1.children('a').css('color', '#817066');
			$left_choose_top2.children('a').css('color', '#817066');
			$left_choose_top3.children('a').css('color', '#817066');
		}

		//点击上面的地址和风格排序和价格排序
		let $left_choose_top1 = $('.left_choose1').children('ul').children('.address');
		let $left_choose_top2 = $('.left_choose1').children('ul').children('.styles');
		let $left_choose_top3 = $('.left_choose1').children('ul').children('.prices');
		//地址查询
		$left_choose_top1.on('click', 'a', function() {
			$left_choose2.children('a').removeClass('active')
			allcolor();
			$(this).css('color', 'red');
			let address = $(this).html();

			$.ajax({
				url: "../api/ecduo_main_choose.php",
				data: {
					'address': address
				},
				success: function(data) {
					let res = JSON.parse(data);
					createlis(res.data);
				}
			});
		})
		//风格查询
		$left_choose_top2.on('click', 'a', function() {
			$left_choose2.children('a').removeClass('active')
			allcolor();
			$(this).css('color', 'red');
			let styles = $(this).html();

			$.ajax({
				url: "../api/ecduo_main_choose.php",
				data: {
					'styles': styles
				},
				success: function(data) {
					let res = JSON.parse(data);
					createlis(res.data);
				}
			});
		})
		//价格区间查询
		$left_choose_top3.on('click', 'a', function() {
			$left_choose2.children('a').removeClass('active')
			allcolor();
			$(this).css('color', 'red');
			let pricetype;
			let prices = $(this).html();
			if(prices == '0-30元') {
				pricetype = 1;
			} else if(prices == '30-50元') {
				pricetype = 2;
			} else if(prices == '50-80元') {
				pricetype = 3;
			} else if(prices == '80元以上') {
				pricetype = 4;
			}
			$.ajax({
				url: "../api/ecduo_main_choose.php",
				data: {
					'pricetype': pricetype
				},
				success: function(data) {
					let res = JSON.parse(data);
					createlis(res.data);
				}
			});
		})

		//销量排序
		let $left_choose2 = $('.left_choose2');
		let nums = 0;
		$left_choose2.on('click', 'a', function() {
			allcolor();
			$left_choose2.children('a').removeClass('active')
			$(this).addClass('active');

			let sequencing;
			if($(this).text() == '综合排序') {
				sequencing = 1;
			} else if($(this).text() == '销量') {
				sequencing = 2;
			} else if($(this).text() == '新品') {
				sequencing = 3;
			} else if($(this).text() == '价格') {
				if(nums == 0) {
					sequencing = 4;
					nums = 1;
					console.log(nums)
				} else if(nums == 1) {
					sequencing = 5;
					nums = 0;
					console.log(nums)
				}
			}
			$.ajax({
				url: "../api/ecduo_main_choose.php",
				data: {
					'sequencing': sequencing,
					'qty': 20,
					'page': 1
				},
				success: function(data) {
					let res = JSON.parse(data);
					createlis(res.data);
				}
			});
		})

		//顶部吸顶盒子
		$(window).scroll(function() {
			var h = $(this).scrollTop(); //获得滚动条距top的高度
			if(h > 280) {
				$(".top_fixbox").fadeIn();
			} else {
				$(".top_fixbox").fadeOut();
			}
		});
		//返回顶部效果
		let $fixboxs = $('.fixboxs');
		$fixboxs.on('click', function() {
			$("html,body").animate({
				scrollTop: 0
			}, 1000);
		})

	})

})