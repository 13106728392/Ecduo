// 配置参数
require.config({
	// baseUrl:'lib',

	// 配置别名（虚拟路径）
	paths: {
		// 格式：别名:真实路径（基于baseUrl）
		jquery: '../lib/jquery-3.2.1',
		common: '../lib/common'
	},

});

require(['jquery', 'common'], function($) {
	jQuery(function($) {

		$('.EC_footer').load('base_footer.html');
		let $news_l = $('.news_l');
		let $check_out = $('#check_out');
		let $goodslist_box = $('.goodslist_box');
		let $uls = $goodslist_box.children('ul');
		let $all_totails = $('.all_totails');
		let $allnumber = $all_totails.find('span');
		let $allpricess = $all_totails.find('i');

		hascookies();
		//判断有没有登陆
		function hascookies() {
			let telcook = Cookie.get('tel');
			if(telcook.length === 0) {
				telcook = [];
				alert('请先登陆账号');
				location.href = 'login.html';
				return;
			} else {
				$news_l.find('span').text(`Hi,${telcook}`)
			}
		}
		//退出登陆
		$check_out.click(() => {
			Cookie.remove('tel', '/');
			location.href = '../index.html';
		})

		createhtml();
		var goodslist;
		//根据cookie生成界面
		function createhtml() {
			goodslist = Cookie.get('goodslist');
			if(goodslist.length === 0) {
				goodslist = [];
				//          alert('您好还没有购物喔，请先添加商品')
				return;
			} else {
				goodslist = JSON.parse(goodslist);
			}
			$uls[0].innerHTML = '';
			console.log(goodslist)
			$uls[0].innerHTML = goodslist.map(function(item) {
				return `<li data-id=${item.guid}><input type="checkbox" class='checks' /><img src="../${item.imgurl}" alt="" />
							<p>${item.name}</p>
							<div class="operation">
								<span>${item.color}</span>
								<i class="prices_siza">均码</i>
								<a href="javascript:void(0);" class="minus_num">-</a><input type="text" name="" id="" value="${item.qty}" />
								<a href="javascript:void(0);" class="add_num">+</a>
							</div>
							<i class="prices_i">￥${item.price}</i>
							<i class="prices_num">${item.qty}</i>
							<i class="prices_all">${item.money}</i>
							<a href="javascript:void(0);" class="prices_del"><img src="../img/ljt.png" /></a>
						</li>`
			}).join('');
		}

		//减号
		$goodslist_box.on('click', '.minus_num', function() {
			let $lis = $(this).parent().parent();
			let $prices_num = $lis.find('.prices_num');
			let $prices_all = $lis.find('.prices_all');
			let $prices_i = $lis.find('.prices_i');

			let num = $(this).next('input')[0].value--;
			$prices_num.text(num - 1);
			if(num == 1) {
				$(this).next('input')[0].value = 1;
				return;
			}
			let nums = $prices_num.text();
			let price = $prices_i.text().slice(1);
			$prices_all.text((nums * 1 * price * 1).toFixed(2));
			allprices();
		})

		//加号
		$goodslist_box.on('click', '.add_num', function() {
			let $lis = $(this).parent().parent();
			let $prices_num = $lis.find('.prices_num');
			let $prices_all = $lis.find('.prices_all');
			let $prices_i = $lis.find('.prices_i');
			let num = $(this).prev('input')[0].value++;
			$lis.find('.prices_num').text(num + 1);
			let nums = $prices_num.text();
			let price = $prices_i.text().slice(1);
			$prices_all.text((nums * 1 * price * 1).toFixed(2));
			allprices();
		})

		//全选
		let $all_btn = $('#all_btn');
		let $checks = $('.checks');
		$all_btn.on('click', function() {
			$checks.prop('checked', this.checked);
		})
		let $prices_num = $goodslist_box.find('.prices_num');
		let $prices_all = $goodslist_box.find('.prices_all')
		//商品的总数的和总价格
		function allprices() {
			let nums = 0;
			let prices = 0;
			$prices_num.map(function(idx, item) {
				nums += item.innerHTML * 1;
			});
			$prices_all.map(function(idx, item) {
				prices += (item.innerHTML * 1);
			});
			$allnumber.text(nums);
			prices = prices.toFixed(2);
			$allpricess.text(`￥${prices}`)
		}

		let $prices_del = $('.prices_del');
		$prices_del.on('click', function() {
			let lis = $(this).parent().attr('data-id');
			modifycookie(lis)
		})

		//修改cookie
		function modifycookie(lis) {
			let goodslist = Cookie.get('goodslist');
			if(goodslist.length === 0) {
				goodslist = [];
				return;
			} else {
				goodslist = JSON.parse(goodslist);
			}
//			let newgoodlist = [];
			goodslist.map(function(item, idx) {
				if(item.guid == lis) {
//					newgoodlist[idx] = item;
					goodslist.splice(idx, 1);
				}
			})
			Cookie.remove('goodslist');
			var d = new Date();
			d.setDate(d.getDate() + 1);
			Cookie.set('goodslist', JSON.stringify(goodslist),d,'/');
			createhtml();
		}

	})
})