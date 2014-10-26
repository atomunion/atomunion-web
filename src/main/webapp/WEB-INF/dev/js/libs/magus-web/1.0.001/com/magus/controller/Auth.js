Ext.define("com.atomunion.web.controller.Auth", {
			extend : "Ext.app.Controller",
			requires : ["com.atomunion.web.Auth", "com.atomunion.web.Comments"],
			refs : [{
						ref : "authHeaderForm",
						selector : "authHeaderForm"
					}],
			init : function() {
				this.control({
							"authHeaderForm, authForm" : {
								login : this.login,
								logout : this.logout
							}
						});
			},
			onLaunch : function() {
				//if (com.atomunion.web.Comments.isEnabled()) {
					if (com.atomunion.web.Auth.isLoggedIn()) {
						this.setLoggedIn();
					} else {
						this.setLoggedOut();
					}
				//}
			},
			login : function(e, g, f, h) {
				com.atomunion.web.Auth.login({
							username : g,
							password : f,
							remember : h,
							success : this.setLoggedIn,
							failure : function(a) {
								e.showMessage(a);
							},
							scope : this
						});
			},
			logout : function(b) {
				com.atomunion.web.Auth.logout(this.setLoggedOut, this,true);
			},
			setLoggedIn : function() {
				this.getAuthHeaderForm()
									.showLoggedIn(com.atomunion.web.Auth.getUser());
				this.getController("Tabs").loadTabs(function(){
					com.atomunion.web.Comments.loadSubscriptions(function() {
							
							this.eachCmp("commentsListWithForm", function(b) {
										b.showCommentingForm();
									});
							this.eachCmp("commentsList", function(b) {
										b.refresh();
									});
							this.getController("Tabs").showCommentsTab();
							com.atomunion.web.Auth.notifyLoadingFinish();
							//TODO
							com.atomunion.web.History.navigate('#!/home', true);
							this.getController("Tabs").notifyHistoryTabs();
						}, this);
				},this);
			},
			setLoggedOut : function(r) {
				if(r){
				 	document.location.reload();
				}else{
					com.atomunion.web.Comments.clearSubscriptions();
					this.getAuthHeaderForm().showLoggedOut();
					
					this.eachCmp("commentsListWithForm", function(b) {
								b.showAuthForm();
							});
					this.eachCmp("commentsList", function(b) {
								b.refresh();
							});
					this.getController("Tabs").unloadTabs();
				}
			},
			eachCmp : function(e, f, d) {
				Ext.Array.forEach(Ext.ComponentQuery.query(e), f, d);
			}
		});