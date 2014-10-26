Ext.define("com.atomunion.web.view.cls.Toolbar", {
	extend : "Ext.toolbar.Toolbar",
	requires : ["com.atomunion.web.view.HoverMenuButton", "com.atomunion.web.Settings",
			"com.atomunion.web.Comments", "Ext.form.field.Checkbox"],
	dock : "top",
	cls : "member-links",
	docClass : {},
	accessors : {},
	initComponent : function() {
		this.addEvents("menubuttonclick", "commentcountclick", "filter",
				"toggleExpanded");
		this.items = [];
		this.memberButtons = {};
		var h = {
			cfg : "Configs",
			property : "Properties",
			method : "Methods",
			event : "Events",
			css_var : "CSS Vars",
			css_mixin : "CSS Mixins"
		};
		for (var i in h) {
			var f = this.docClass.members[i].concat(this.docClass.statics[i]);
			f.sort(function(a, b) {
						if (a.name === "constructor" && a.tagname === "method") {
							return -1
						}
						return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
					});
			if (f.length > 0) {
				var j = this.createMemberButton({
							text : h[i],
							type : i,
							members : f
						});
				this.memberButtons[i] = j;
				this.items.push(j)
			}
		}
		this.checkItems = {
			"public" : this.createCb("Public", "public"),
			"protected" : this.createCb("Protected", "protected"),
			"private" : this.createCb("Private", "private"),
			inherited : this.createCb("Inherited", "inherited"),
			accessor : this.createCb("Accessor", "accessor"),
			deprecated : this.createCb("Deprecated", "deprecated"),
			removed : this.createCb("Removed", "removed")
		};
		var g = this;
		this.items = this.items.concat([{
					xtype : "tbfill"
				}, this.filterField = Ext.widget("triggerfield", {
							triggerCls : "reset",
							cls : "member-filter",
							hideTrigger : true,
							emptyText : "Filter class members",
							enableKeyEvents : true,
							width : 150,
							listeners : {
								keyup : function(a) {
									this.fireEvent("filter", a.getValue(), this
													.getShowFlags());
									a.setHideTrigger(a.getValue().length === 0)
								},
								specialkey : function(a, b) {
									if (b.keyCode === Ext.EventObject.ESC) {
										a.reset();
										this.fireEvent("filter", "", this
														.getShowFlags())
									}
								},
								scope : this
							},
							onTriggerClick : function() {
								this.reset();
								this.focus();
								g.fireEvent("filter", "", g.getShowFlags());
								this.setHideTrigger(true)
							}
						}), {
					xtype : "tbspacer",
					width : 10
				}, this.commentCount = this.createCommentCount(), {
					xtype : "button",
					text : "Show",
					menu : [this.checkItems["public"],
							this.checkItems["protected"],
							this.checkItems["private"], "-",
							this.checkItems.inherited,
							this.checkItems.accessor,
							this.checkItems.deprecated, this.checkItems.removed]
				}, {
					xtype : "button",
					iconCls : "expand-all-members",
					tooltip : "Expand all",
					enableToggle : true,
					toggleHandler : function(b, a) {
						b.setIconCls(a
								? "collapse-all-members"
								: "expand-all-members");
						this.fireEvent("toggleExpanded", a)
					},
					scope : this
				}]);
		this.callParent(arguments)
	},
	getShowFlags : function() {
		var d = {};
		for (var c in this.checkItems) {
			d[c] = this.checkItems[c].checked
		}
		return d
	},
	createCb : function(c, d) {
		return Ext.widget("menucheckitem", {
					text : c,
					checked : com.atomunion.web.Settings.get("show")[d],
					listeners : {
						checkchange : function() {
							this.fireEvent("filter", this.filterField
											.getValue(), this.getShowFlags())
						},
						scope : this
					}
				})
	},
	createMemberButton : function(d) {
		var c = Ext.Array.map(d.members, function(a) {
					return this.createLinkRecord(this.docClass.name, a)
				}, this);
		return Ext.create("com.atomunion.web.view.HoverMenuButton", {
					text : d.text,
					cls : "icon-" + d.type,
					store : this.createStore(c),
					showCount : true,
					listeners : {
						click : function() {
							this.fireEvent("menubuttonclick", d.type)
						},
						scope : this
					}
				})
	},
	createStore : function(c) {
		var d = Ext.create("Ext.data.Store", {
					fields : ["id", "url", "label", "inherited", "accessor",
							"meta", "commentCount"]
				});
		d.add(c);
		return d
	},
	createLinkRecord : function(d, c) {
		return {
			id : c.id,
			url : d + "-" + c.id,
			label : (c.tagname === "method" && c.name === "constructor")
					? "new " + d
					: c.name,
			inherited : c.owner !== d,
			accessor : c.tagname === "method"
					&& this.accessors.hasOwnProperty(c.name),
			meta : c.meta,
			commentCount : com.atomunion.web.Comments.getCount(["class", d, c.id])
		}
	},
	showMenuItems : function(d, e, f) {
		Ext.Array.forEach(["cfg", "property", "method", "event"], function(b) {
			if (this.memberButtons[b]) {
				var c = this.memberButtons[b].getStore();
				c.filterBy(function(h) {
					return !(!d["public"]
							&& !(h.get("meta")["private"] || h.get("meta")["protected"])
							|| !d["protected"] && h.get("meta")["protected"]
							|| !d["private"] && h.get("meta")["private"]
							|| !d.inherited && h.get("inherited")
							|| !d.accessor && h.get("accessor")
							|| !d.deprecated && h.get("meta")["deprecated"]
							|| !d.removed && h.get("meta")["removed"] || e
							&& !f.test(h.get("label")))
				});
				var a = this.memberButtons[b].menu;
				if (a && Ext.getVersion().version >= "4.1.0") {
					a.show();
					a.hide()
				}
			}
		}, this)
	},
	getFilterValue : function() {
		return this.filterField.getValue()
	},
	createCommentCount : function() {
		return Ext.create("Ext.container.Container", {
					width : 24,
					margin : "0 4 0 0",
					cls : "comment-btn",
					html : "0",
					hidden : true,
					listeners : {
						afterrender : function(b) {
							b.el.addListener("click", function() {
										this.fireEvent("commentcountclick")
									}, this)
						},
						scope : this
					}
				})
	},
	showCommentCount : function() {
		this.commentCount.show()
	},
	setCommentCount : function(b) {
		this.commentCount.update("" + (b || 0));
		this.refreshMenuCommentCounts()
	},
	refreshMenuCommentCounts : function() {
		Ext.Object.each(this.memberButtons, function(c, d) {
					d.getStore().each(function(a) {
						a.set("commentCount", com.atomunion.web.Comments.getCount([
										"class", this.docClass.name,
										a.get("id")]))
					}, this)
				}, this)
	}
});