Ext.define("com.atomunion.web.view.TabMenu", {
			extend : "Ext.menu.Menu",
			plain : true,
			componentCls : "tab-menu",
			initComponent : function() {
				this.addEvents("tabItemClick", "closeAllTabs");
				this.items = [{
							text : "Close other tabs",
							iconCls : "close",
							cls : "close-all",
							handler : function() {
								this.fireEvent("closeAllTabs")
							},
							scope : this
						}];
				this.callParent()
			},
			addTab : function(c, d) {
				this.insert(this.items.length - 1, {
							text : c.text,
							iconCls : c.iconCls,
							origIcon : c.iconCls,
							href : c.href,
							cls : d,
							handler : this.onTabItemClick,
							scope : this
						})
			},
			onTabItemClick : function(b) {
				this.fireEvent("tabItemClick", b)
			},
			addTabCls : function(c, d) {
				this.items.each(function(a) {
							if (a.href === c.href) {
								a.addCls(d)
							}
						})
			}
		});