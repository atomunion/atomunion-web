Ext.define("com.atomunion.web.view.cls.Tree", {
			extend : "com.atomunion.web.view.DocTree",
			alias : "widget.classtree",
			requires : ["com.atomunion.web.view.cls.PackageLogic",
					"com.atomunion.web.view.cls.InheritanceLogic", "com.atomunion.web.Settings"],
			initComponent : function() {
				this.setLogic(com.atomunion.web.Settings.get("classTreeLogic"),
						com.atomunion.web.Settings.get("showPrivateClasses"));
				this.dockedItems = [{
					xtype : "container",
					dock : "bottom",
					layout : "hbox",
					items : [{
								width : 34
							}, {
								xtype : "checkbox",
								boxLabel : "Show private classes",
								cls : "cls-private-cb",
								checked : com.atomunion.web.Settings
										.get("showPrivateClasses"),
								listeners : {
									change : function(d, c) {
										this.setLogic(com.atomunion.web.Settings
														.get("classTreeLogic"),
												c)
									},
									scope : this
								}
							}]
				}, {
					xtype : "container",
					dock : "bottom",
					cls : "cls-grouping",
					html : [
							this.makeButtonHtml("PackageLogic", "By Package"),
							this.makeButtonHtml("InheritanceLogic",
									"By Inheritance")].join("")
				}];
				this.on("afterrender", this.setupButtonClickHandler, this);
				this.callParent()
			},
			makeButtonHtml : function(d, c) {
				return Ext.String.format(
						'<button class="{0} {1}">{2}</button>', d,
						com.atomunion.web.Settings.get("classTreeLogic") === d
								? "selected"
								: "", c)
			},
			setupButtonClickHandler : function() {
				this.el.addListener("click", function(g, h) {
							var f = Ext.get(h), e = Ext.get(Ext
									.query(".cls-grouping button.selected")[0]);
							if (e.dom === f.dom) {
								return
							}
							e.removeCls("selected");
							f.addCls("selected");
							if (f.hasCls("PackageLogic")) {
								this.setLogic("PackageLogic",
										com.atomunion.web.Settings
												.get("showPrivateClasses"))
							} else {
								this.setLogic("InheritanceLogic",
										com.atomunion.web.Settings
												.get("showPrivateClasses"))
							}
						}, this, {
							delegate : "button"
						})
			},
			setLogic : function(i, f) {
				com.atomunion.web.Settings.set("classTreeLogic", i);
				com.atomunion.web.Settings.set("showPrivateClasses", f);
				var g = new com.atomunion.web.view.cls[i]({
							classes : this.data,
							showPrivateClasses : f
						});
				if (this.root) {
					var h = this.getSelectionModel().getLastSelected();
					var j = g.create();
					this.expandLonelyNode(j.root);
					this.setRootNode(j.root);
					this.initNodeLinks();
					h && this.selectUrl(h.raw.url)
				} else {
					var j = g.create();
					this.root = j.root;
					this.expandLonelyNode(this.root)
				}
				this.privates = j.privates
			},
			expandLonelyNode : function(d) {
				var c = Ext.Array.filter(d.children, function(a) {
							return a.children.length > 0
						});
				if (c.length == 1) {
					c[0].expanded = true
				}
			},
			findRecordByUrl : function(b) {
				return this.callParent([b]) || this.findPrivateRecordByUrl(b)
			},
			findPrivateRecordByUrl : function(e) {
				var f = this.privates;
				for (var d = 0; d < f.length; d++) {
					if (f[d].url === e) {
						return f[d]
					}
				}
				return undefined
			}
		});