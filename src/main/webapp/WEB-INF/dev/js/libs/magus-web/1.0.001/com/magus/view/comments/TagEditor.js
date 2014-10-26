Ext.define("com.atomunion.web.view.comments.TagEditor", {
			extend : "Ext.container.Container",
			requires : ["com.atomunion.web.model.Tag"],
			floating : true,
			hidden : true,
			componentCls : "comments-tageditor",
			statics : {
				cachedStore : undefined,
				getStore : function() {
					if (!this.cachedStore) {
						this.cachedStore = Ext.create("Ext.data.Store", {
									model : "com.atomunion.web.model.Tag",
									listeners : {
										load : function() {
											this.cachedStore.sort("tagname",
													"ASC")
										},
										scope : this
									}
								});
						this.cachedStore.load()
					}
					return this.cachedStore
				}
			},
			initComponent : function() {
				this.items = [{
							xtype : "combobox",
							listConfig : {
								cls : "comments-tageditor-boundlist"
							},
							store : this.statics().getStore(),
							queryMode : "local",
							displayField : "tagname",
							valueField : "tagname",
							enableKeyEvents : true,
							emptyText : "New tag name...",
							listeners : {
								select : this.handleSelect,
								blur : this.destroy,
								keyup : this.onKeyUp,
								scope : this
							}
						}];
				this.callParent(arguments)
			},
			popup : function(b) {
				this.show();
				this.alignTo(b, "bl", [-12, -2]);
				this.down("combobox").focus(true, 100)
			},
			onKeyUp : function(c, d) {
				if (d.keyCode === Ext.EventObject.ENTER) {
					this.handleSelect()
				} else {
					if (d.keyCode === Ext.EventObject.ESC) {
						this.destroy()
					}
				}
			},
			handleSelect : function() {
				var c = Ext.String.trim(this.down("combobox").getValue() || "");
				if (c) {
					var d = this.rememberNewTag(c);
					this.fireEvent("select", d)
				}
				this.destroy()
			},
			rememberNewTag : function(g) {
				var f = this.statics().getStore();
				var e = new RegExp("^" + Ext.String.escapeRegex(g) + "$", "i");
				var h = f.query("tagname", e);
				if (h.getCount() === 0) {
					f.add({
								tagname : g
							});
					f.sort("tagname", "ASC");
					return g
				} else {
					return h.get(0).get("tagname")
				}
			}
		});