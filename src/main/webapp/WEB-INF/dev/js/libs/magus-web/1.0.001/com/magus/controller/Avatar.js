Ext.define("com.atomunion.web.controller.Avatar", {
			extend : "com.atomunion.web.controller.Content",
			baseUrl : "#!/example",
			title : "Avatar",
			requires : [],
			refs : [{
						ref : "viewport",
						selector : "#viewport"
					}, {
						ref : "doctabs",
						selector : "#doctabs"
					}, {
						ref : "page",
						selector : "#example"
					}, {
						ref : "avatar",
						selector : ".avatar"
					}],
			init : function() {
				this.addEvents("showAvatar");
//				Ext.getBody().addListener("click", function(c, d) {
//							this.avatarClick("user/session/info");
//						}, this, {
//							preventDefault : true,
//							delegate : ".avatar"
//						});
			},
			avatarClick : function(d, f, e) {
				// d = com.atomunion.web.History.cleanUrl(d);
				this.loadAvatar({
					href : "#!/avatar/"+d,
					text : '个人信息维护',
					url : d,
					iconCls : 'SecurityUser'
				});
			},
			loadAvatar : function(e, f) {
				var href=e.href, p = {
					animate : true,
					activate : true
				};//url = e.url,
				this.getViewport().setPageTitle(e.text);
				
				Ext.getCmp("card-panel").layout.setActiveItem("example");
				Ext.getCmp("treecontainer").showTree("exampletree");
				var examples = this.getController("Examples");
				
				if (examples.activeHref !== href) {
					examples.activateExampleCard();
					if (!this.getDoctabs().hasTabBodyLoaded(href)) {
						this.getPage().load(e);
						p.bodyLoaded = true;
					}
					this.getPage().active(e);
				}else{
					examples.activateExampleCard();
				}
				
				p.bodyLoaded = p.bodyLoaded
						|| this.getDoctabs().hasTabBodyLoaded(href);
				f || com.atomunion.web.History.push(href);
				
				this.fireEvent("showAvatar", e, p);
				//examples.fireEvent("showExample", d, p);
				examples.activeHref = href;
			}
		});