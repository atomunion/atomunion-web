Ext.define("com.atomunion.web.view.cls.Overview", {
			extend : "Ext.panel.Panel",
			alias : "widget.classoverview",
			requires : ["com.atomunion.web.view.cls.Toolbar",
					"com.atomunion.web.view.examples.Inline",
					"com.atomunion.web.view.comments.LargeExpander",
					"com.atomunion.web.view.cls.MemberWrap",
					"com.atomunion.web.view.comments.MemberWrap", "com.atomunion.web.Syntax",
					"com.atomunion.web.Settings", "com.atomunion.web.Comments"],
			mixins : ["com.atomunion.web.view.Scrolling"],
			cls : "class-overview iScroll",
			autoScroll : true,
			border : false,
			bodyPadding : "20 8 20 5",
			initComponent : function() {
				this.addEvents("afterload");
				this.callParent(arguments)
			},
			scrollToEl : function(j, h) {
				var g = (typeof j == "string") ? Ext.get(Ext.query(j)[0]) : j;
				if (g) {
					var f = g.hasCls("member");
					g.show();
					if (!g.isVisible(true)) {
						g.up(".subsection").show();
						g.up(".members-section").show()
					}
					if (f && g.down(".expandable")) {
						this.setMemberExpanded(j.replace(/#/, ""), true)
					}
					var i = this.body.getBox().y;
					this.scrollToView(g, {
								highlight : true,
								offset : (h || 0) - (f ? i : i - 10)
							})
				}
			},
			load : function(b) {
				this.docClass = b;
				this.accessors = this.buildAccessorsMap();
				if (this.toolbar) {
					this.removeDocked(this.toolbar, false);
					this.toolbar.destroy()
				}
				this.toolbar = Ext.create("com.atomunion.web.view.cls.Toolbar", {
							docClass : this.docClass,
							accessors : this.accessors,
							listeners : {
								filter : function(d, a) {
									this.filterMembers(d, a)
								},
								menubuttonclick : function(a) {
									this.scrollToEl("h3.members-title.icon-"
													+ a, -20)
								},
								commentcountclick : this.expandClassComments,
								scope : this
							}
						});
				this.addDocked(this.toolbar);
				this.update(b.html);
				com.atomunion.web.Syntax.highlight(this.getEl());
				this.filterMembers("", com.atomunion.web.Settings.get("show"));
				if (com.atomunion.web.Comments.isEnabled()) {
					this.initComments()
				} else {
					this.initBasicMemberWrappers()
				}
				this.fireEvent("afterload")
			},
			initComments : function() {
				this.toolbar.showCommentCount();
				this.toolbar.setCommentCount(com.atomunion.web.Comments.getCount([
						"class", this.docClass.name, ""]));
				this.clsExpander = new com.atomunion.web.view.comments.LargeExpander({
							name : this.docClass.name,
							el : Ext.query(".doc-contents")[0]
						});
				this.memberWrappers = {};
				Ext.Array.forEach(Ext.query(".member"), function(c) {
							var d = new com.atomunion.web.view.comments.MemberWrap({
										parent : this,
										className : this.docClass.name,
										el : c
									});
							this.memberWrappers[d.getMemberId()] = d
						}, this)
			},
			initBasicMemberWrappers : function() {
				this.memberWrappers = {};
				Ext.Array.forEach(Ext.query(".member"), function(c) {
							var d = new com.atomunion.web.view.cls.MemberWrap({
										el : c
									});
							this.memberWrappers[d.getMemberId()] = d
						}, this)
			},
			updateCommentCounts : function() {
				if (!this.docClass) {
					return
				}
				var b = com.atomunion.web.Comments.getCount(["class",
						this.docClass.name, ""]);
				this.toolbar.setCommentCount(b);
				this.clsExpander.getExpander().setCount(b);
				Ext.Object.each(this.memberWrappers, function(a, d) {
							d.setCount(com.atomunion.web.Comments.getCount(d
									.getTarget()))
						}, this)
			},
			expandClassComments : function() {
				var b = this.clsExpander.getExpander();
				b.expand();
				this.scrollToEl(b.getEl(), -40)
			},
			setMemberExpanded : function(c, d) {
				this.memberWrappers[c].setExpanded(d)
			},
			isMemberExpanded : function(b) {
				return this.memberWrappers[b].isExpanded()
			},
			setAllMembersExpanded : function(b) {
				if (com.atomunion.web.Comments.isEnabled()) {
					Ext.Object.each(this.memberWrappers, function(a, d) {
								d.getExpander().show()
							}, this)
				}
				Ext.Object.each(this.memberWrappers, function(a, d) {
							d.setExpanded(b)
						}, this)
			},
			filterMembers : function(h, e) {
				com.atomunion.web.Settings.set("show", e);
				var f = h.length > 0;
				Ext.Array.forEach(Ext.query(".doc-contents, .hierarchy"),
						function(a) {
							Ext.get(a).setStyle({
										display : f ? "none" : "block"
									})
						});
				var g = new RegExp(Ext.String.escapeRegex(h), "i");
				this.eachMember(function(c) {
							var b = Ext.get(c.id);
							var a = !(!e["public"]
									&& !(c.meta["private"] || c.meta["protected"])
									|| !e["protected"] && c.meta["protected"]
									|| !e["private"] && c.meta["private"]
									|| !e.inherited
									&& (c.owner !== this.docClass.name)
									|| !e.accessor && c.tagname === "method"
									&& this.accessors.hasOwnProperty(c.name)
									|| !e.deprecated && c.meta.deprecated
									|| !e.removed && c.meta.removed || f
									&& !g.test(c.name));
							if (a) {
								b.setStyle({
											display : "block"
										})
							} else {
								b.setStyle({
											display : "none"
										})
							}
						}, this);
				Ext.Array.forEach(Ext.query(".member.first-child"),
						function(a) {
							Ext.get(a).removeCls("first-child")
						});
				Ext.Array.forEach(Ext.query(".members-section"), function(b) {
							var a = this.getVisibleElements(".member", b);
							Ext.get(b).setStyle({
										display : a.length > 0
												? "block"
												: "none"
									});
							Ext.Array.forEach(Ext.query(".subsection", b),
									function(d) {
										var c = this.getVisibleElements(
												".member", d);
										if (c.length > 0) {
											c[0].addCls("first-child");
											Ext.get(d).setStyle({
														display : "block"
													})
										} else {
											Ext.get(d).setStyle({
														display : "none"
													})
										}
									}, this)
						}, this);
				this.toolbar.showMenuItems(e, f, g)
			},
			buildAccessorsMap : function(c) {
				var d = {};
				Ext.Array.forEach(this.docClass.members.cfg, function(b) {
							var a = Ext.String.capitalize(b.name);
							d["get" + a] = true;
							d["set" + a] = true
						});
				return d
			},
			getVisibleElements : function(e, d) {
				var f = Ext.Array.map(Ext.query(e, d), function(a) {
							return Ext.get(a)
						});
				return Ext.Array.filter(f, function(a) {
							return a.isVisible()
						})
			},
			eachMember : function(c, d) {
				Ext.Array.forEach(["members", "statics"], function(a) {
							Ext.Object.each(this.docClass[a], function(b, f) {
										Ext.Array.forEach(f, c, d)
									}, this)
						}, this)
			}
		});