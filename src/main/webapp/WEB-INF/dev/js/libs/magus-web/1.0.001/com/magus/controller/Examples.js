Ext.define("com.atomunion.web.controller.Examples", {
			extend : "com.atomunion.web.controller.Content",
			baseUrl : "#!/example",
			title : "Examples",
			refs : [{
						ref : "viewport",
						selector : "#viewport"
					}, {
						ref : "index",
						selector : "#exampleindex"
					}, {
						ref : "tree",
						selector : "#exampletree"
					}, {
						ref : "page",
						selector : "#example"
					},{
						ref : "doctabs",
						selector : "#doctabs"
					}],
			init : function() {
				this.addEvents("showExample");
				this.control({
							"#exampletree" : {
								urlclick : function(d, c) {
									this.loadExample(d);
								}
							},
							"exampleindex > thumblist" : {
								urlclick : function(b) {
									this.loadExample(b);
								}
							},
							touchexamplecontainer : {
								afterrender : function(b) {
									b.el.addListener("click", function(d, a) {
												this.changeDevice("tablet");
											}, this, {
												delegate : "button.tablet"
											});
									b.el.addListener("click", function(d, a) {
												this.changeDevice("phone");
											}, this, {
												delegate : "button.phone"
											});
									b.el.addListener("click", function(d, a) {
												this
														.changeOrientation("portrait");
											}, this, {
												delegate : "button.portrait"
											});
									b.el.addListener("click", function(d, a) {
												this
														.changeOrientation("landscape");
											}, this, {
												delegate : "button.landscape"
											});
									b.el.addListener("click", function(d, a) {
												this.openInNewWindow();
											}, this, {
												delegate : "button.new-window"
											});
								}
							}
						});
			},
			loadIndex : function() {
				Ext.getCmp("treecontainer").showTree("exampletree");
				this.callParent();
			},
			loadExample : function(d, f) {
				Ext.getCmp("header").show();
				Ext.getCmp("footer").show();
				
				//var d = u.match(/^#!\/example\/(.*)$/)[1];
				var e = this.findExample(d),p={
					animate : true,
					activate : true
				};
				if (!e) {
					this.getController("Failure").show404("Example <b>" + d
							+ "</b> was not found.");
					return
				}
				this.getViewport().setPageTitle(e.text);
				if (this.activeHref !== d) {
					//this.getPage().clear();
					this.activateExampleCard();
					
					if(!this.getDoctabs().hasTabBodyLoaded(d)){
						this.getPage().load(e);
						p.bodyLoaded=true;
					}
					this.getPage().active(e);
				} else {
					this.activateExampleCard();
				}
				p.bodyLoaded = p.bodyLoaded || this.getDoctabs().hasTabBodyLoaded(d);
				f || com.atomunion.web.History.push(d);
				this.fireEvent("showExample", d ,p);
				this.getTree().selectHref(d);
				this.activeHref = d;
			},
			activateExampleCard : function() {
				Ext.getCmp("card-panel").layout.setActiveItem("example");
				Ext.getCmp("treecontainer").showTree("exampletree");
			},
			build : function(b) {
					Ext.Array.map(b, function(a) {
						this.map[a.href] = {
									text : a.text || a.title,
									iconCls : a.iconCls,
									href : a.href,
									url : a.url
								};
								
						if(a.children || a.items){
							this.build(a.children || a.items);
						}
					}, this);
			},
			getExample : function(b) {
				if (!this.map) {
					this.map = {};
					this.build(com.atomunion.web.data.examples.children);	
				}
				return this.map[b];
			},
			build2 : function(b) {
					b.eachChild(function(a) {
							var parentNode = a,parents = [];
							while(parentNode.parentNode){
								parentNode = parentNode.parentNode;
								parents.unshift({
									text : parentNode.raw.text || parentNode.raw.title,
									iconCls : parentNode.raw.iconCls,
									href : parentNode.raw.href,
									url : parentNode.raw.url
								});
							}
							
							this.map[a.raw.href] = {
									text : a.raw.text || a.raw.title,
									iconCls : a.raw.iconCls,
									href : a.raw.href,
									url : a.raw.url,
									parents:parents
								};
							a && this.build2(a);
						},this);
			},
			findExample : function(b) {
				if (!this.map) {
					this.map = {};
					this.build2(this.getTree().getRootNode());
				}
				return this.map[b];
			},
			changeOrientation : function(b) {
				this.getPage().setOrientation(b);
			},
			changeDevice : function(b) {
				this.getPage().setDevice(b);
			},
			openInNewWindow : function() {
				window.open(this.findExample(this.activeHref).url);
			}
		});