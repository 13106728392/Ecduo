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
		let $tel = $('#tel');
		let $passw = $('#passw');
		let $emails = $('#emails');
		let $runnum = $('#runnum')
		let $passw_p = $('.passw_p');
		let $tel_p = $('.tel_p');
		let $emails_p = $('.emails_p');
		let $runnum_p = $('.runnum_p');

		//名字的验证
		$tel.on('blur', () => {
			let tel_v = $tel.val();
			var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if(!myreg.test(tel_v)) {
				$tel.removeClass('success').addClass('flase');
				$tel_p.removeClass('okthing').addClass('badthing').text('账号不合法');
				return false;
			}
			if(tel_v == 0) {
				$tel.removeClass('success').addClass('flase');
				$tel_p.removeClass('okthing').addClass('badthing').text('账号不能为空');
				return false;
			}
			$.ajax({
				url: "../api/reg.php",
				data: {
					tel: tel_v
				},
				success: function(res) {
					if(res === 'success') {
						$tel.removeClass('flase').addClass('success');
						$tel_p.removeClass('badthing').addClass('okthing').text('该账号可以注册');
						return true;
					} else {
						$tel.removeClass('success').addClass('flase');
						$tel_p.removeClass('okthing').addClass('badthing').text('该账号已经注册，请换一个');
						return false;
					}
				}
			})
		});

		//密码
		$passw.on('blur', () => {
			let pass_v = $passw.val();
			var passreg = /^[a-zA-Z0-9]\w{5,17}$/;
			if(!passreg.test(pass_v)) {
				$passw.removeClass('success').addClass('flase');
				$passw_p.removeClass('okthing').addClass('badthing').text('密码格式不对');
				return false;
			} else {
				$passw.removeClass('flase').addClass('success');
				$passw_p.removeClass('badthing').addClass('okthing').text('密码格式正确');
				return true;
			}
		})

		//邮箱
		$emails.on('blur', () => {
			let email_v = $emails.val();
			var emailreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

			if(!emailreg.test(email_v)) {
				$emails.removeClass('success').addClass('flase');
				$emails_p.removeClass('okthing').addClass('badthing').text('请输入正确的邮箱地址');
				return false;
			} else {
				$emails.removeClass('flase').addClass('success');
				$emails_p.removeClass('badthing').addClass('okthing').text('邮箱地址正确');
				return true;
			}
		})

		//生成验证码
		let $runnum_box = $('.runnum_box');

		function createCodes() {
			$runnum_box.html(randomNumber(1000, 9999));
		}
		createCodes();
		$runnum_box.click(() => {
			createCodes();
		})
		//验证码
		$runnum.on('blur', () => {
			let run_v = $runnum.val();
			if(run_v != $runnum_box.text()) {
				$runnum.removeClass('success').addClass('flase');
				$runnum_p.removeClass('okthing').addClass('badthing').text('请输入正确的验证码');
				return false;
			} else {
				$runnum.removeClass('flase').addClass('success');
				$runnum_p.removeClass('badthing').addClass('okthing').text('验证码正确');
				return true;
			}
		})

		let $reg_btn = $('.reg_btn');
		$reg_btn.on('click', function() {
			if($tel.hasClass('success') && $passw.hasClass('success') && $emails.hasClass('success') && $runnum.hasClass('success')) {

				let tel_v = $tel.val();
				let passw_v = $passw.val();
				let emails_v = $emails.val();

				$.ajax({
					url: "../api/reg.php",
					data: {
						type: "reg",
						tel: tel_v,
						password: passw_v,
						email: emails_v
					},
					success: function(data) {
						if(data == 'success') {
							alert('注册成功');
							location.href ='login.html';
						} else {
							alert('注册失败')
						}
					}
				});
			} else {
				alert('请填写正确的表单注册')
			}

		})
		
		
		
		
		
		//********************登录页面*******************************
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

	})

})