Ext.define("com.atomunion.web.view.auth.HeaderForm", {
	extend : "com.atomunion.web.view.auth.BaseForm",
	alias : "widget.authHeaderForm",
	requires : ["com.atomunion.web.Comments"],
	initComponent : function() {
	},
	afterRender : function() {
		this.callParent(arguments);
		this.getEl().addListener("click", this.showLoginForm, this, {
					preventDefault : true,
					delegate : ".login"
				});
		this.getEl().addListener("click", function() {
					this.fireEvent("logout", this)
				}, this, {
					preventDefault : true,
					delegate : ".logout"
				})

		this.getEl().addListener("click", function() {
					com.atomunion.web.App.getController("Avatar").loadAvatar({
								href : "#!/avatar/user/session/info",
								text : "个人信息",
								url : "user/session/info",
								iconCls : "icon-security-user-info"
							}, true);
				}, this, {
					preventDefault : true,
					delegate : ".userinfo"
				});
	},
	showLoginForm : function() {
		this.update(this.createLoginFormHtml());
		this.bindFormSubmitEvent()
	},
	showLoggedIn : function(d) {
		var c = com.atomunion.web.Comments.avatar(d.emailHash, d.photo);
		this.update('<div><a href="#" class="userinfo">' + d.userName
				+ '</a> | <a href="#" class="logout">Logout</a></div>' + c);
		var scope = this;
		$(".avatar").qtip({
			content : '<div class="ibx-inner"><div class="ibx-uc-uimg">'
					+ '<div class="ibx-uc-uimg-mask"><a class="ibx-uc-ulink" href="javascript:void(0)">更换头像</a></div>'
					+ '<img class="ibx-uc-img" src="'
					+ (d.photo || 'images/upload/user/photo-user.png')
					+ '"/></div>'
					+ '<div class="ibx-uc-unick"><a href="javascript:void(0)" class="ibx-uc-nick">'
					+ d.userName
					+ '</a></div>'
					+ '<div class="ibx-uc-utool">'
					+ (d.mobile
							? ('<div class="ibx-uc-utool-mobile current" title="'
									+ d.mobile + '"></div>')
							: '未绑定手机')
					+ ' '
					+ (d.email
							? ('<div class="ibx-uc-utool-envelope current" title="'
									+ d.email + '"></div>')
							: '未绑定邮箱')
					/*
					 * + (!d.mobile && !d.email ? '<div
					 * class="ibx-uc-utool-none">未绑定手机、邮箱</div>' : '')
					 */
					+ '</div>'
					+ '<div class="ibx-uc-uop">'
					+ '<div class="ibx-uc-uop-item"><a class="icon-security-user-info" href="javascript:void(0)" url="user/session/info" title="个人信息">个人信息</a></div>'
					+ '<div class="ibx-uc-uop-item"><a class="icon-security-password" href="javascript:void(0)" url="user/session/password" title="修改密码">修改密码</a></div>'
					+ '<div class="ibx-uc-uop-item"><a class="icon-security-admin" href="mailto:lico.atom@gmail.com" title="意见反馈">意见反馈</a></div>'
					+ '<div class="ibx-uc-uop-item"><a class="icon-security-exit" href="javascript:void(0)" url="logout" title="退出登录">退出登录</a></div>'
					+ '</div></div>',
			position : {
				at : 'top right',
				my : 'top left'
			},
			show : {
				target : false, // Defaults to target element
				event : 'click', // Show on mouse over by default
				effect : true, // Use default 90ms fade effect
				delay : 90, // 90ms delay before showing
				solo : false, // Do not hide others when showing
				ready : false, // Do not show immediately
				modal : { // Requires Modal plugin
					on : false, // No modal backdrop by default
					effect : true, // Mimic show effect on backdrop
					blur : true, // Hide tooltip by clicking backdrop
					escape : true
					// Hide tooltip when Esc pressed
				}
			},
			hide : {
				target : false, // Defaults to target element
				event : 'unfocus', // Hide on mouse out by default
				effect : true, // Use default 90ms fade effect
				delay : 0, // No hide delay by default
				fixed : false, // Non-hoverable by default
				inactive : false, // Do not hide when inactive
				leave : 'window', // Hide when we leave the window
				distance : false
				// Don't hide after a set distance
			},
			style : {
				classes : 'qtip-light qtip-rounded qtip-shadow'
			},
			events : {
				render : function() {
					$(".ibx-uc-nick").bind('click', function() {
								com.atomunion.web.App.getController("Avatar")
										.loadAvatar({
											href : "#!/avatar/user/session/info",
											text : "个人信息",
											url : "user/session/info",
											iconCls : "icon-security-user-info"
										}, true);
							});

					$(".ibx-uc-ulink").bind('click', function() {
								com.atomunion.web.App.getController("Avatar")
										.loadAvatar({
											href : "#!/avatar/user/session/photo",
											text : "更换头像",
											url : "user/session/photo",
											iconCls : "icon-security-photo"
										}, true);
							});
					$(".ibx-uc-uop-item a").each(function() {
						var url = $(this).attr("url");
						if (url == 'logout') {
							$(this).bind('click', function() {
										scope.fireEvent("logout", scope)
									});
						} else if (url) {
							$(this).bind('click', function() {
								com.atomunion.web.App.getController("Avatar")
										.loadAvatar({
													href : "#!/avatar/" + url,
													text : $(this)
															.attr("title"),
													url : url,
													iconCls : $(this)
															.attr("class")
												}, true);
							});
						}
					});
				}
			}
		});
	},
	showLoggedOut : function() {
		this.update('<a href="#" class="login">Sign in</a> / <a class="register" href="'
						+ com.atomunion.web.Auth.getRegistrationUrl()
						+ '" target="_blank">Register</a>')
	}
});