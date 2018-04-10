// 详情页面
require.config({

	// 配置别名（虚拟路径）
	paths: {
		// 格式：别名:真实路径（基于baseUrl）
		jquery: '../lib/jquery-3.2.1',
		zoom: '../lib/zoom'
	},

	// 配置依赖
	shim: {
		xzoom: ['jquery']
	}

})

require(['jquery', 'zoom'], function($) {
	jQuery(function($) {
		$('.EC_header').load('base_header.html ');
		$('.EC_footer').load('base_footer.html');

		//要动态添加的信息
		let $a_names = $('.a_names');
		let $goods_titles = $('.goods_titles');
		let $good_prices = $('.good_prices');
		let $taobao_new = $('.taobao_new');
		let $choose_size = $('.choose_size');
		let $input_num = $('.input_num');
		let $zoom_smallshow = $('.zoom_smallshow');
		let $buy_goods = $('.buy_goods');
		let $addto_car = $('.addto_car');

		//截取地址栏
		let location = window.location.search.substring(1).split('=');
		let datas = {};
		location.map(function(item) {
			datas.id = item;
		})
		let ids = datas.id;
		$.ajax({
			url: "../api/goods_details.php",
			data: {
				'id': ids
			},
			success: function(data) {
				let res = JSON.parse(data);
				console.log(res);
				res.map(function(item) {
					let strings = `../${item.imgurl}`;
					magnifier(".zoom_show", 420, 420, strings, 200, 200, 420) //调用
					$a_names.html(item.name)
					$zoom_smallshow.children('ul').prepend(`<li class="active"><img src="../${item.imgurl}"></li>`)
					$goods_titles.children('h2').text(item.name);
					$good_prices.children('h2').children('span').text(item.price);
					$taobao_new.children('h3').eq(0).children('span').text(item.hot);
					$buy_goods.find('.fn_a').text(item.color);
					$taobao_new.children('h3').eq(1).children('span').text(item.salesprice);
					$choose_size.children('h3').eq(0).children('span').text(item.color);
					$input_num.children('ul').children('li').eq(0).children('i').eq(0).text(item.sizeXL);
					$input_num.children('ul').children('li').eq(0).children('i').eq(1).text(item.price);
					$input_num.children('ul').children('li').eq(1).children('i').eq(0).text(item.sizeL);
					$input_num.children('ul').children('li').eq(1).children('i').eq(1).text(item.price);
					$input_num.children('ul').children('li').eq(2).children('i').eq(0).text(item.sizeM);
					$input_num.children('ul').children('li').eq(2).children('i').eq(1).text(item.price);
					$input_num.children('ul').children('li').eq(3).children('i').eq(0).text(item.sizeS);
					$input_num.children('ul').children('li').eq(3).children('i').eq(1).text(item.price);
				})
			}
		});
		$zoom_smallshow.on('click', 'li', function() {
			$(this).addClass('active').siblings('li').removeClass('active');
			let imgsrc = $(this).children('img').attr('src');
			magnifier(".zoom_show", 420, 420, imgsrc, 200, 200, 420) //调用
		})

		$input_num.on('click', '.minus_num', function() {
			let vals = $(this).next('input');
			let $lis = $(this).parent().parent()
			let idxs = $('.input_num li').index($lis);
			let num = vals[0].value--;
			if(num == 0) {
				vals[0].value = 0;
				return;
			}
			allprice(idxs, num - 1);
		})
		$input_num.on('click', '.add_num', function() {
			let $lis = $(this).parent().parent()
			let idxs = $('.input_num li').index($lis)
			let vals = $(this).prev('input');
			let num = vals[0].value++;
			allprice(idxs, num + 1);
		})

		//获得总数
		function allprice(idxs, num) {
			console.log(idxs, num)
			let $allinput = $input_num.find('input');
			let total = 0;
			$allinput.map(function(idx, item) {
				total += item.value * 1;
			})
			if(total != 0) {
				$buy_goods.css('display', 'block');
			} else {
				$buy_goods.css('display', 'none');
			}
			$addto_car.find('span').eq(0).text(total);
			$buy_goods.find('.fn_b').text(`(${total}件)`);
			$buy_goods.find('.fn_c').children('i').eq(idxs).children('span').text(`${num}`);
			let nums = $good_prices.children('h2').children('span').text();
			let moneys = (total * nums).toFixed(2);
			$addto_car.find('span').eq(1).text(moneys);
		}

	})

})