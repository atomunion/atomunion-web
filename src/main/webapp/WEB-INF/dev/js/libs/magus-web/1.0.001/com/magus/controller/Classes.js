Ext.define("com.atomunion.web.controller.Classes", {
	extend : "com.atomunion.web.controller.Content",
	baseUrl : "#!/api",
	title : "API Documentation",
	requires : ["com.atomunion.web.History", "com.atomunion.web.Syntax",
		"com.atomunion.web.RemoteResourceRegistry"],
	refs : [{
			ref : "viewport",
			selector : "#viewport"
		}, {
			ref : "index",
			selector : "#classindex"
		}, {
			ref : "header",
			selector : "classheader"
		}, {
			ref : "overview",
			selector : "classoverview"
		}, {
			ref : "tabPanel",
			selector : "classtabpanel"
		}, {
			ref : "tree",
			selector : "#classtree"
		}, {
			ref : "favoritesGrid",
			selector : "#favorites-grid"
		}],
	cache : {},
	init : function() {
		this.addEvents("showIndex", "showClass", "showMember");
		Ext.getBody().addListener("click", function(c, d) {
				this.handleUrlClick(decodeURI(d.href), c)
			}, this, {
				preventDefault : true,
				delegate : ".docClass"
			});
		this.control({
			classtree : {
				urlclick : function(d, c) {
					this.handleUrlClick(d, c, this.getTree())
				}
			},
			toolbar : {
				toggleExpanded : function(b) {
					this.getOverview().setAllMembersExpanded(b)
				}
			},
			classoverview : {
				afterrender : function(b) {
					b.el.addListener("click", function(i, k) {
							var h = Ext.get(k).up(".member"), l = h.down(".meta .defined-in"), j = l
								.getAttribute("rel"), a = h.getAttribute("id");
							if (this.getOverview().isMemberExpanded(a)) {
								this.setExpanded(a, false)
							} else {
								this.setExpanded(a, true);
								this.fireEvent("showMember", j, a)
							}
						}, this, {
							preventDefault : true,
							delegate : ".expandable"
						});
					b.el.addListener("click", Ext.emptyFn, this, {
							preventDefault : true,
							delegate : ".not-expandable"
						})
				}
			},
			treecontainer : {
				afterrender : function(b) {
					b.el.addListener("dblclick", function() {
							if (b.getWidth() < 30) {
								b.setWidth(b.expandedWidth)
							} else {
								b.expandedWidth = b.getWidth();
								b.setWidth(20)
							}
						}, this, {
							delegate : ".x-resizable-handle"
						})
				}
			},
			doctabs : {
				tabClose : function(b) {
					if (this.getOverview() != null) {
						this.getOverview().eraseScrollContext(b);
					}
				}
			}
		})
	},
	setExpanded : function(f, d) {
		var e = this.currentCls;
		if (!e.expanded) {
			e.expanded = {}
		}
		this.getOverview().setMemberExpanded(f, d);
		if (d) {
			e.expanded[f] = d
		} else {
			delete e.expanded[f]
		}
	},
	applyExpanded : function(b) {
		Ext.Object.each(b.expanded || {}, function(a) {
				Ext.get(a).addCls("open")
			}, this)
	},
	handleUrlClick : function(d, f, e) {
		d = com.atomunion.web.History.cleanUrl(d);
		if (this.opensNewWindow(f)) {
			window.open(d);
			e && e.selectUrl(this.currentCls ? "#!/api/" + this.currentCls.name : "")
		} else {
			this.loadClass(d)
		}
	},
	loadIndex : function(b) {
		Ext.getCmp("treecontainer").showTree("classtree");
		this.callParent(arguments);
		this.fireEvent("showIndex")
	},
	loadClass : function(f, i) {
		Ext.getCmp("card-panel").layout.setActiveItem("classcontainer");
		Ext.getCmp("treecontainer").showTree("classtree");
		i || com.atomunion.web.History.push(f);
		var j = f.match(/^#!\/api\/(.*?)(?:-(.*))?$/);
		var g = com.atomunion.web.RemoteResourceRegistry.aliasName(j[1]);
		var h = j[2];
		if (this.getOverview()) {
			this.getOverview().setLoading(true)
		}
		if (this.cache[g]) {
			this.showClass(this.cache[g], h)
		} else {
			this.cache[g] = "in-progress";
			Ext.data.JsonP.request({
					url : this.getBaseUrl() + "/output/" + g + ".js",
					callbackName : g.replace(/\./g, "_"),
					success : function(b, a) {
						this.cache[g] = b;
						this.showClass(b, h)
					},
					failure : function(b, a) {
						this.cache[g] = false;
						this.getOverview().setLoading(false);
						this.getController("Failure").show404("Class <b>" + g
							+ "</b> was not found.")
					},
					scope : this
				})
		}
	},
	showClass : function(e, f) {
		var d = false;
		if (e === "in-progress") {
			return
		}
		this.getOverview().setLoading(false);
		this.getViewport().setPageTitle(e.name);
		if (this.currentCls !== e) {
			this.currentCls = e;
			this.getHeader().load(e);
			this.getOverview().load(e);
			this.applyExpanded(e);
			d = true
		}
		this.currentCls = e;
		this.getOverview().setScrollContext("#!/api/" + e.name);
		if (f) {
			this.getOverview().scrollToEl("#" + f);
			this.fireEvent("showMember", e.name, f)
		} else {
			this.getOverview().restoreScrollState()
		}
		this.getTree().selectUrl("#!/api/" + e.name);
		this.fireEvent("showClass", e.name, {
				reRendered : d
			})
	}
});