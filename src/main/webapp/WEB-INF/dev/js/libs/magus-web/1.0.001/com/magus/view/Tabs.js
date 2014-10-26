Ext.define("com.atomunion.web.view.Tabs", {
	extend : "Ext.container.Container",
	alias : "widget.doctabs",
	id : "doctabs",
	componentCls : "doctabs",
	requires : ["com.atomunion.web.History", "com.atomunion.web.view.TabMenu"],
	minTabWidth : 80,
	maxTabWidth : 160,
	animDuration : 150,
	tabs : [],
	tabsInBar : [],
	tabCache : {},
	staticTabs : [],
	initComponent : function() {
		this.addEvents("tabActivate", "tabClose");
		this.tpl = Ext.create("Ext.XTemplate", '<tpl for=".">',
				'<div class="doctab overview {cls}{active}">',
				'<div class="l"></div>', '<div class="m">', '<tpl if="text">',
				'<a class="tabUrl ov-tab-text" href="{href}">{text}</a>',
				"<tpl else>",
				'<a class="tabUrl ov-tab" href="{href}">&nbsp;</a>', "</tpl>",
				"</div>", '<div class="r"></div>', "</div>", "</tpl>",
				'<div style="float: left; width: 8px">&nbsp;</div>',
				'<div class="tab-overflow"></div>');
		this.html = this.tpl.applyTemplate(this.staticTabs);
		this.tabTpl = Ext.create("Ext.XTemplate", '<div class="doctab',
				'{[values.active ? (" active") : ""]}', '" style="',
				'{[values.width ? ("width: " + values.width + "px;") : ""]}',
				'{[values.visible ? "" : "visibility: hidden;"]}">',
				'<div class="l"></div>', '<div class="m">',
				'<span class="icn {iconCls}">&nbsp;</span>',
				'<a class="tabUrl main-tab" href="{href}">{text}</a>',
				"</div>",
				'<div class="r"><a class="close" href="#">&nbsp;</a></div>',
				"</div>");
		this.on("afterrender", this.initListeners, this);
		this.on("resize", this.refresh, this);
		this.callParent();
	},
	initListeners : function() {
		this.el.on("mouseover", function(c, d) {
					Ext.get(d).addCls("ovr");
				}, this, {
					delegate : ".close"
				});
		this.el.on("mouseout", function(c, d) {
					Ext.get(d).removeCls("ovr");
				}, this, {
					delegate : ".close"
				});
		this.el.on("click", function(f, d) {
					var e = Ext.get(d).up(".doctab").down(".tabUrl")
							.getAttribute("href");
					e = com.atomunion.web.History.cleanUrl(e);
					this.removeTab(e);
					this.fireEvent("tabClose", e);
				}, this, {
					delegate : ".close",
					preventDefault : true
				});
		this.el.on("click", function(f, d) {
					if (Ext.fly(f.getTarget()).hasCls("close")) {
						return
					}
					var e = Ext.get(d).down(".tabUrl").getAttribute("href");
					this.fireEvent("tabActivate", e, {
								navigate : true
							});
				}, this, {
					delegate : ".doctab"
				});
		this.el.on("contextmenu", function(c, d) {
					if (!Ext.get(d).hasCls("overview")) {
						this.createMenu().showBy(d);
					}
				}, this, {
					delegate : ".doctab",
					preventDefault : true
				});
		this.el.on("click", Ext.emptyFn, this, {
					delegate : ".tabUrl",
					preventDefault : true
				});
		this.el.on("mouseleave", function() {
					if (this.shouldResize) {
						this.resizeTabs({
									animate : true
								});
					}
				}, this);
	},
	setStaticTabs : function(b) {
		this.staticTabs = b;
		this.refresh();
	},
	getStaticTabs : function(b) {
		return this.staticTabs;
	},
	hasTabBodyLoaded : function(d) {
		return (this.hasTab(d) && this.tabCache[d] && this.tabCache[d].bodyLoaded);
	},
	addTab : function(d, c) {
		this.tabCache[d.href] = Ext.copyTo(d, c, "bodyLoaded");
		if (!this.hasTab(d.href)) {
			this.tabs.push(d.href);
			if (this.roomForNewTab()) {
				this.addTabToBar(d, c);
			}
			this.addTabToMenu(this.overflowButton.menu, d);
		}
		if (c.activate) {
			this.activateTab(d.href);
		}
		this.saveTabs();
	},
	removeTab : function(d) {
		if (!this.hasTab(d)) {
			return
		}
		this.removeFromArray(this.tabs, d);
		var e = this.removeFromArray(this.tabsInBar, d);
		var f = this.tabs[this.tabsInBar.length];
		if (f) {
			this.tabsInBar.push(f);
		}
		if (this.activeTab === d) {
			if (this.tabs.length === 0) {
				com.atomunion.web.App.getController(this.getControllerName(d))
						.loadIndex();
			} else {
				if (e === this.tabs.length) {
					e -= 1;
				}
				this.activateTab(this.tabs[e]);
				this.fireEvent("tabActivate", this.tabs[e]);
			}
		}
		if (this.tabs.length >= this.maxTabsInBar()) {
			this.refresh();
		} else {
			this.removeTabFromBar(d);
		}
		this.saveTabs();
	},
	removeFromArray : function(f, d) {
		var e = Ext.Array.indexOf(f, d);
		if (e !== -1) {
			Ext.Array.erase(f, e, 1);
		}
		return e;
	},
	activateTab : function(d) {
		this.activeTab = d;
		if (!this.inTabs(d)) {
			this.swapLastTabWith(d);
		}
		Ext.Array.each(Ext.query(".doctab a.tabUrl"), function(a) {
					Ext.get(a).up(".doctab").removeCls(["active", "highlight"]);
				});
		var e = Ext.query('.doctab a[href$="' + d + '"]')[0];
		if (e) {
			var f = Ext.get(e).up(".doctab");
			f.addCls("active");
		}
		this.highlightOverviewTab(d);
	},
	refresh : function() {
		var i = this.tpl.applyTemplate(this.staticTabs);
		var f = this.maxTabsInBar() < this.tabs.length
				? this.maxTabsInBar()
				: this.tabs.length;
		this.tabsInBar = this.tabs.slice(0, f);
		for (var j = 0; j < f; j++) {
			var h = this.tabCache[this.tabs[j]];
			var g = Ext.apply(h, {
						visible : true,
						active : this.activeTab === h.href,
						width : this.tabWidth()
					});
			i += this.tabTpl.applyTemplate(g);
		}
		this.el.dom.innerHTML = i;
		if (this.activeTab && this.activeTab !== this.tabs[f - 1]) {
			this.activateTab(this.activeTab);
			this.fireEvent("tabActivate", this.activeTab);
		}
		this.highlightOverviewTab(this.activeTab);
		this.createOverflowButton();
		this.addToolTips();
	},
	closeAllTabs : function() {
		if (this.inTabBar(this.activeTab)) {
			this.tabs = this.tabsInBar = [this.activeTab];
		} else {
			this.tabs = this.tabsInBar = [];
		}
		this.refresh();
		this.saveTabs();
	},
	tabData : function() {
		return Ext.Array.map(this.tabs, function(b) {
					return this.tabCache[b];
				}, this);
	},
	roomForNewTab : function() {
		return this.tabsInBar.length < this.maxTabsInBar();
	},
	hasTab : function(b) {
		return Ext.Array.contains(this.tabs, b);
	},
	addTabToBar : function(e, d) {
		this.tabsInBar.push(e.href);
		var f = Ext.get(this.tabTpl.append(this.el.dom, e));
		if (d.animate && !Ext.isIE) {
			f.setStyle("width", "10px");
			f.setStyle({
						visibility : "visible"
					});
			f.animate({
						to : {
							width : this.tabWidth()
						}
					});
		} else {
			f.setStyle({
						visibility : "visible"
					});
		}
		this.resizeTabs(d);
	},
	inTabBar : function(b) {
		return Ext.Array.contains(this.tabsInBar, b);
	},
	inTabs : function(d) {
		var c = Ext.Array.pluck(this.staticTabs, "href").concat(this.tabsInBar);
		return Ext.Array.contains(c, d);
	},
	removeTabFromBar : function(d) {
		var c = this.getTabEl(d);
		c.dom.removed = true;
		if (Ext.isIE) {
			c.remove();
			this.createOverflowButton();
		} else {
			c.animate({
						to : {
							top : 30
						},
						duration : this.animDuration
					}).animate({
						to : {
							width : 10
						},
						duration : this.animDuration,
						listeners : {
							afteranimate : function() {
								c.remove();
								this.shouldResize = true;
								this.createOverflowButton();
							},
							scope : this
						}
					});
		}
	},
	swapLastTabWith : function(d) {
		var e = this.getTabEl(this.tabsInBar[this.tabsInBar.length - 1]);
		if (e) {
			var f = this.tabTpl.append(document.body, this.tabCache[d]);
			e.dom.parentNode.replaceChild(f, e.dom);
			this.tabsInBar[this.tabsInBar.length - 1] = d;
			Ext.get(f).setStyle({
						visibility : "visible",
						width : String(this.tabWidth()) + "px"
					});
		}
	},
	highlightOverviewTab : function(d) {
		var c = Ext.query(".doctab." + this.getControllerName(d).toLowerCase());
		if (c && c[0]) {
			Ext.get(c[0]).addCls("highlight");
		}
	},
	maxTabsInBar : function() {
		return Math.floor(this.tabBarWidth() / this.minTabWidth);
	},
	tabWidth : function() {
		var b = Math.floor(this.tabBarWidth() / this.tabsInBar.length) + 6;
		if (b > this.maxTabWidth) {
			return this.maxTabWidth;
		} else {
			if (b < this.minTabWidth) {
				return this.minTabWidth;
			} else {
				return b;
			}
		}
	},
	tabBarWidth : function() {
		return this.getWidth() - (this.staticTabs.length * 50) - 15;
	},
	resizeTabs : function(b) {
		this.shouldResize = false;
		Ext.Array.each(Ext.query(".doctab"), function(a) {
					var d = Ext.get(a);
					if (!d.dom.removed && !d.hasCls("overview")) {
						if (b && b.animate && !Ext.isIE) {
							d.animate({
										to : {
											width : this.tabWidth()
										}
									});
						} else {
							d.setWidth(this.tabWidth());
						}
					}
				}, this);
	},
	getTabEl : function(c) {
		var d = Ext.query('.doctab a[href$="' + c + '"]');
		if (d && d[0]) {
			return Ext.get(d[0]).up(".doctab");
		}
	},
	createOverflowButton : function() {
		if (this.overflowButton) {
			this.overflowButton.destroy();
		}
		this.overflowButton = Ext.create("Ext.button.Button", {
					baseCls : "",
					renderTo : this.getEl().down(".tab-overflow"),
					menu : this.createMenu()
				});
	},
	createMenu : function() {
		var b = new com.atomunion.web.view.TabMenu({
					listeners : {
						closeAllTabs : this.closeAllTabs,
						tabItemClick : function(a) {
							this.fireEvent("tabActivate", a.href, {
										navigate : true
									});
						},
						scope : this
					}
				});
		Ext.Array.each(this.tabs, function(a) {
					this.addTabToMenu(b, this.tabCache[a]);
				}, this);
		return b;
	},
	addTabToMenu : function(g, h) {
		var f = Ext.Array.indexOf(this.tabs, h.href);
		if (this.tabs.length > this.tabsInBar.length
				&& f === this.maxTabsInBar()) {
			g.addTabCls(h, "overflow");
		}
		var e = this.inTabBar(h.href);
		g.addTab(h, e ? "" : "overflow");
	},
	addToolTips : function() {
		Ext.Array.each(this.staticTabs, function(c) {
					var d = Ext.get(Ext.query(".doctab." + c.cls)[0]);
					if (d) {
						Ext.create("Ext.tip.ToolTip", {
									target : d,
									html : c.tooltip
								});
					}
				});
	},
	saveTabs : function() {
		//TODO 1.数组元素有序且下标表示active顺序 2.数组元素无序但添加属性表示active
		if(this.tabs.length>0){
			var index = Ext.Array.indexOf(this.tabs, this.activeTab);
			if(index != -1 && index != this.tabs.length-1){
				this.tabs.concat(this.tabs.splice(index,1));
			}
		}
		com.atomunion.web.Settings.set("tabs", this.tabs);
	},
	unloadResources : function() {
		var statics = [];
		Ext.Array.each(this.staticTabs, function(tab, index, tabs) {
					if (tab.statics) {
						statics.push(tab);
					}
				});
		this.setStaticTabs(statics);

		var treecontainer = Ext.getCmp("treecontainer"), cardcontainer = Ext
				.getCmp("card-panel"), item = null;
		while ((item = treecontainer.child("*"))) {
			treecontainer.remove(item, true);
		}
		while ((item = cardcontainer.child("*[statics!=true]"))) {
			cardcontainer.remove(item, true);
		}

		Ext.Array.each(this.tabsInBar, function(href, index, tabs) {
					this.removeTabFromBar(href);
				}, this);

		this.tabs = [];
		this.tabsInBar = [];
		this.tabCache = {};
	},
	loadResources : function(data) {
		Ext.getCmp("card-panel").add([{
			padding : "0 0",
					xtype : "homeindex",
					id : "homeindex"
				}, {
					xtype : "exampleindex",
					id : "exampleindex"
				}, {
					xtype : data.touchExamplesUi
							? "touchexamplecontainer"
							: "examplecontainer",
					id : "example"
				}, {
					autoScroll : true,
					xtype : "classindex",
					id : "classindex"
				}, {
					xtype : "classcontainer",
					id : "classcontainer"
				}, {
					autoScroll : true,
					xtype : "guideindex",
					id : "guideindex"
				}, {
					autoScroll : true,
					xtype : "guidecontainer",
					id : "guide",
					cls : "iScroll"
				}, {
					xtype : "videoindex",
					id : "videoindex"
				}, {
					autoScroll : true,
					xtype : "videocontainer",
					id : "video",
					cls : "iScroll"
				}/*
					 * ,{ xtype : "testsindex", id : "testsindex" }
					 */]);
		Ext.getCmp("treecontainer").add([{

			xtype : "grouptree",
			id : "exampletree",
			data : Ext.clone(data.examples)
				/*
				 * ,store : new Ext.data.TreeStore({ model :
				 * 'com.atomunion.web.model.Resource', requires :
				 * ["Ext.data.proxy.Rest"], proxy : { format : 'json', type :
				 * 'rest', url : 'security/guides', reader : { type : 'json',
				 * root : 'data' } } })
				 */
			}, {
			xtype : "classtree",
			id : "classtree",
			data : data.classes

		}, {
			xtype : "grouptree",
			id : "guidetree",
			data : data.guides,
			convert : function(b) {
				return {
					leaf : true,
					text : b.title,
					url : "#!/guide/" + b.name,
					iconCls : "icon-guide"
				};
			}

		}, {
			xtype : "grouptree",
			id : "videotree",
			data : data.videos,
			convert : function(b) {
				return {
					leaf : true,
					text : b.title,
					url : "#!/video/" + b.name,
					iconCls : "icon-video"
				};
			}
		}]);
	},
	getControllerName : function(b) {
		if (/#!?\/home/.test(b)) {
			return "Home";
		} else {
			if (/#!?\/api/.test(b)) {
				return "Classes";
			} else {
				if (/#!?\/guide/.test(b)) {
					return "Guides";
				} else {
					if (/#!?\/video/.test(b)) {
						return "Videos";
					} else {
						if (/#!?\/example/.test(b)) {
							return "Examples";
						} else {
							if (/#!?\/avatar/.test(b)) {
								return "Examples";
							} else {
								if (/#!?\/tests/.test(b)) {
									return "Tests";
								} else {
									if (/#!?\/comment/.test(b)) {
										return "Comments";
									} else {
										return "Index";
									}
								}
							}
						}
					}
				}
			}
		}
	}
});