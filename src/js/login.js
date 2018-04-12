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

		//********************登录页面*******************************
		let $telname = $('#telname');
		let $lpassword = $('#lpassword');
		let $login_btnss = $('.login_btnss');
		let $login_box = $('.login_box');
		let $atuo_login = $('#atuo_login');

		checked();

		function checked() {
			//自动登录
			let ss = Cookie.get('tel');
			if(ss == undefined) {
				return;
			}

			if(ss.length > 0) {
				location.href = '../index.html';
			}
		}

		$login_btnss.on('click', function() {

			let tel_v = $telname.val().trim();

			let pass_v = $lpassword.val();

			$.ajax({
				url: "../api/login.php",
				data: {
					tel: tel_v,
					password: pass_v
				},
				success: function(data) {
					if(data == 'success') {
						//判断是否勾选了免登陆
						if($atuo_login[0].checked) {
							var d = new Date();
							d.setDate(d.getDate() + 7);
							Cookie.set('tel', tel_v, d, '/')
						}
						$login_box.find('h4').text('登录成功').removeClass('false').addClass('success');
						location.href = '../index.html';
					} else {
						$login_box.find('h4').text('账号或密码错误，请重试').removeClass('success').addClass('false');
					}
				}
			});
		})

	})

})