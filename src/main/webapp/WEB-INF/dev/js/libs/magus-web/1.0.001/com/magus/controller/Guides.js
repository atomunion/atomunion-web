Ext.define("com.atomunion.web.controller.Guides", {
	extend : "com.atomunion.web.controller.Content",
	baseUrl : "#!/guide",
	title : "Guides",
	refs : [{
				ref : "viewport",
				selector : "#viewport"
			}, {
				ref : "index",
				selector : "#guideindex"
			}, {
				ref : "tree",
				selector : "#guidetree"
			}, {
				ref : "guide",
				selector : "#guide"
			}],
	cache : {},
	init : function() {
		this.addEvents("showGuide");
		this.control({
					"#guidetree" : {
						urlclick : function(d, c) {
							this.handleUrlClick(d, c, this.getTree())
						}
					},
					"guideindex > thumblist" : {
						urlclick : function(b) {
							this.loadGuide(b)
						}
					},
					indexcontainer : {
						afterrender : function(b) {
							b.el.addListener("click", function(d, a) {
										this.handleUrlClick(a.href, d)
									}, this, {
										preventDefault : true,
										delegate : ".guide"
									})
						}
					},
					doctabs : {
						tabClose : function(b) {
							if(this.getGuide() != null){
								this.getGuide().eraseScrollContext(b);
							}
						}
					}
				})
	},
	handleUrlClick : function(d, f, e) {
		d = d.replace(/.*#!?/, "#!");
		if (this.opensNewWindow(f)) {
			window.open(d);
			e && e.selectUrl(this.activeUrl ? this.activeUrl : "")
		} else {
			this.loadGuide(d)
		}
	},
	loadIndex : function() {
		Ext.getCmp("treecontainer").showTree("guidetree");
		this.callParent()
	},
	loadGuide : function(j, h) {
		Ext.getCmp("card-panel").layout.setActiveItem("guide");
		Ext.getCmp("treecontainer").showTree("guidetree");
		var g = j.match(/(.*?)(-section-[0-9]+)?$/);
		var f = g[1];
		var i = g[2];
		j = f;
		h || com.atomunion.web.History.push(j);
		if (this.cache[f]) {
			this.showGuide(this.cache[f], j, f, i)
		} else {
			this.cache[f] = "in-progress";
			Ext.data.JsonP.request({
						url : this.getBaseUrl() + "/guides/" + f + "/README.js",
						callbackName : f,
						success : function(a) {
							this.cache[f] = a;
							this.showGuide(a, j, f, i)
						},
						failure : function(b, a) {
							this.cache[f] = false;
							this.getController("Failure").show404("Guide <b>"
									+ f + "</b> was not found.")
						},
						scope : this
					})
		}
	},
	showGuide : function(i, j, f, h) {
		var g = false;
		if (i === "in-progress") {
			return
		}
		this.getViewport().setPageTitle(i.title);
		if (this.activeUrl !== j) {
			Ext.getCmp("guide").load({
						name : f,
						content : i.guide
					});
			g = true
		}
		this.activeUrl = j;
		this.getGuide().setScrollContext(this.activeUrl);
		if (h) {
			this.getGuide().scrollToEl(f + h)
		} else {
			this.getGuide().restoreScrollState()
		}
		this.fireEvent("showGuide", f, {
					reRendered : g
				});
		this.getTree().selectUrl(j)
	}
});