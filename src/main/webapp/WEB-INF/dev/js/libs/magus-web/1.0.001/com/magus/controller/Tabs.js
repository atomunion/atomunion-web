Ext.define("com.atomunion.web.controller.Tabs", {
			extend : "Ext.app.Controller",
			requires : ["com.atomunion.web.History", "com.atomunion.web.Settings","com.atomunion.web.model.Resource"],
			refs : [{
						ref : "welcomeIndex",
						selector : "#welcomeindex"
					},{
						ref : "homeIndex",
						selector : "#homeindex"
					}, {
						ref : "classIndex",
						selector : "#classindex"
					}, {
						ref : "guideIndex",
						selector : "#guideindex"
					}, {
						ref : "videoIndex",
						selector : "#videoindex"
					}, {
						ref : "exampleIndex",
						selector : "#exampleindex"
					}, {
						ref : "testsIndex",
						selector : "#testsindex"
					}, {
						ref : "commentIndex",
						selector : "#commentindex"
					}, {
						ref : "classTree",
						selector : "#classtree"
					}, {
						ref : "guideTree",
						selector : "#guidetree"
					}, {
						ref : "exampleTree",
						selector : "#exampletree"
					}, {
						ref : "videoTree",
						selector : "#videotree"
					}, {
						ref : "doctabs",
						selector : "#doctabs"
					}],
			init : function() {
				this.getController("Avatar").addListener({
							showAvatar : function(b,p) {
								this.addTab(b,p);
							},
							scope : this
						});
				this.getController("Classes").addListener({
							showClass : function(b) {
								this.addTabFromTree("#!/api/" + b);
							},
							scope : this
						});
				this.getController("Guides").addListener({
							showGuide : function(b) {
								this.addTabFromTree("#!/guide/" + b);
							},
							scope : this
						});
				this.getController("Examples").addListener({
							showExample : function(b,p) {
								//b为href，p为追加的属性对象
								this.addTabFromTree(b,p);
							},
							scope : this
						});
				this.getController("Videos").addListener({
							showVideo : function(b) {
								this.addTabFromTree("#!/video/" + b);
							},
							scope : this
						});
				this.control({
							"[componentCls=doctabs]" : {
								tabActivate : function(d, c) {
									com.atomunion.web.History.push(d, c);
								},
								scope : this
							}
						});
				var b = this.getController("Auth");
				b.onLaunch = Ext.Function.createSequence( b.onLaunch,this.afterAuthLaunch,
						this);
			},
			afterAuthLaunch : function() {
				var staticTabs = this.getWelcomeIndex().getTab();
				//this.staticTabs =  [staticTabs];
				this.getDoctabs().setStaticTabs(Ext.Array.filter([
								staticTabs], function(a) {
							return a;
						}));
				// this.commentsTab = this.getCommentIndex().getTab();
				if (!com.atomunion.web.Auth.isLoggedIn()){
					com.atomunion.web.History.navigate('#', true);
				}
			},
			notifyHistoryTabs:function(){
				var b = com.atomunion.web.Settings.get("tabs");
				if (b) {
					Ext.Array.forEach(b, function(a) {
								this.addTabFromTree(a, {
											animate : false
										});
							}, this);
				}
				//com.atomunion.web.History.notifyTabsLoaded();
			},
			loadTabs : function(callback,context) {
				// TODO 动态增加tab
				var scope = this;
				Ext.Ajax.request({
							url : "security/resources/guides",
							params : {
								format:'json'
							},
							method : "GET",
							//cors : true,
							success: function(response, opts) {
						        var b = Ext.JSON.decode(response.responseText);
								        
						    	com.atomunion.web.data.examples = b.guides;
						    	com.atomunion.web.data.search = b.search;
						    	
						    	var tabs = scope.getDoctabs();
						    	
						    	tabs.loadResources(com.atomunion.web.data);
								
								tabs.setStaticTabs(tabs.getStaticTabs().concat([scope.getHomeIndex().getTab(),scope.getExampleIndex().getTab()
								/*,scope.getClassIndex().getTab(),scope.getGuideIndex().getTab(),scope.getVideoIndex().getTab(),this.getTestsIndex().getTab()*/
								]));
						    
								callback.call(context);
						    },
						    failure: function(response, opts) {
						        alert("error");
						    },
							scope : this
						});
			
				//获取数据
				//Ext.ModelManager.getModel('com.atomunion.web.model.Resource').load('root', {
				//    success: function(resource) {}
				//});
			},
			unloadTabs : function() {
				/**
				 * TODO 动态删除tab
				 */
				 this.hideCommentsTab();
				 this.getDoctabs().unloadResources();
			},
			showCommentsTab : function() {
				var b = this.getDoctabs().getStaticTabs();// this.commentsTab

				Ext.getCmp("card-panel").add([{
							xtype : "commentindex",
							id : "commentindex"
						}]);
				this.getDoctabs().setStaticTabs(b.concat([this
						.getCommentIndex().getTab()]));
			},
			hideCommentsTab : function() {
				var b = this.getDoctabs().getStaticTabs();
				this.getDoctabs().setStaticTabs(Ext.Array.remove(b,
						this.commentsTab));
			},
			addTabFromTree : function(h, g) {
				var e = this.getTree(h);
				var f = e.findRecordByHref(h);
				if (f) {
					this.addTab(f, g);
				}
			},
			addTab : function(d, c) {
				c = c || {
					animate : true,
					activate : true
				};
				this.getDoctabs().addTab({
							url : d.url,
							href : d.href,
							text : d.text,
							iconCls : d.iconCls
						}, c);
			},
			getTree : function(b) {
				if (/#!?\/api/.test(b)) {
					return this.getClassTree();
				} else {
					if (/#!?\/guide/.test(b)) {
						return this.getGuideTree();
					} else {
						if (/#!?\/video/.test(b)) {
							return this.getVideoTree();
						} else {
							if (/#!?\/example/.test(b)) {
								return this.getExampleTree();
							} else {
								return this.getClassTree();
							}
						}
					}
				}
			}
		});