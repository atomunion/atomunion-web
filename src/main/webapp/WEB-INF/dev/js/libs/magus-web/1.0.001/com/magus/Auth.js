Ext.define("com.atomunion.web.Auth", {
			singleton : true,
			requires : ["Ext.Ajax", "Ext.util.Cookies","com.atomunion.web.Comments","com.atomunion.web.view.Loading"],
			init : function(c, d) {
				Ext.Ajax.request({
							url : com.atomunion.web.data.commentsUrl + "/security/session",
							params : {
								format:'json',
								sid : this.getSid()
							},
							method : "GET",
							//cors : true,
							callback : function(g, a, h) {
								if (h && h.responseText) {
									var b = Ext.JSON.decode(h.responseText);
									if (b && b.sessionID) {
										this.setSid(b.sessionID)
									}
									if (b && b.id) {
										this.currentUser = b
									}
									com.atomunion.web.Comments.init(c,d,!!this.currentUser);
									com.atomunion.web.view.Loading.setContext(b.contextName,b.contextVersion);
								} else {
									c.call(d);
								}
							},
							scope : this
						})
			},
			login : function(b) {
				Ext.Ajax.request({
							url : com.atomunion.web.data.commentsUrl + "/security/login",
							method : "POST",
							//cors : true,
							params : {
								_spring_security_remember_me:b.remember,
								j_username : b.username,
								j_password : b.password
							},
							callback : function(h, f, a) {
								var g = Ext.JSON.decode(a.responseText);
								if (g.success) {
									this.currentUser = g;
									this.setSid(g.sessionID, b.remember);
									
									com.atomunion.web.Comments.initComment();
									
									b.success && b.success.call(b.scope);
								} else {
									b.failure
											&& b.failure
													.call(b.scope, g.reason)
								}
							},
							scope : this
						})
			},
			logout : function(c, d, args) {
				Ext.Ajax.request({
							url : com.atomunion.web.data.commentsUrl + "/security/logout",
							params : {
								sid : this.getSid(),
								_method:"delete"
							},
							method : "POST",
							//cors : true,
							callback : function() {
								this.currentUser = undefined;
								c && c.call(d,args)
							},
							scope : this
						})
			},
			setSid : function(d, f) {
				this.sid = d;
				if (d) {
					var e = null;
					if (f) {
						e = new Date();
						e.setTime(e.getTime() + (60 * 60 * 24 * 30 * 1000))
					}
					Ext.util.Cookies.set("sid", d, e)
				} else {
					Ext.util.Cookies.clear("sid")
				}
			},
			getSid : function() {
				if (!this.sid) {
					this.sid = Ext.util.Cookies.get("sid")
				}
				return this.sid
			},
			getUser : function() {
				return this.currentUser
			},
			isLoggedIn : function() {
				return !!this.getUser()
			},
			isModerator : function() {
				return this.getUser() && this.getUser().mod
			},
			getRegistrationUrl : function() {
				return com.atomunion.web.data.commentsUrl + "/register"
			},
			notifyLoadingFinish: function() {
				com.atomunion.web.view.Loading.finish(this.getUser());
			}
		});