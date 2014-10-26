Ext.define("com.atomunion.web.view.HoverMenuButton", {
	extend : "Ext.toolbar.TextItem",
	alias : "widget.hovermenubutton",
	componentCls : "hover-menu-button",
	requires : ["com.atomunion.web.view.HoverMenu"],
	showCount : false,
	statics : {
		menus : []
	},
	initComponent : function() {
		this.addEvents("click");
		if (this.showCount) {
			this.initialText = this.text;
			this.text += " <sup>" + this.store.getCount() + "</sup>";
			this.store.on("datachanged", function() {
						this.setText(this.initialText + " <sup>"
								+ this.store.getCount() + "</sup>")
					}, this)
		}
		this.callParent(arguments)
	},
	getColumnHeight : function() {
		var c = 200;
		var d = 18;
		return Math.floor((Ext.Element.getViewportHeight() - c) / d)
	},
	onRender : function() {
		this.callParent(arguments);
		this.getEl().on({
					click : function() {
						this.fireEvent("click")
					},
					mouseover : this.deferShowMenu,
					mouseout : this.deferHideMenu,
					scope : this
				})
	},
	onDestroy : function() {
		if (this.menu) {
			this.menu.destroy();
			Ext.Array.remove(com.atomunion.web.view.HoverMenuButton.menus, this.menu)
		}
		this.callParent(arguments)
	},
	renderMenu : function() {
		this.menu = Ext.create("com.atomunion.web.view.HoverMenu", {
					store : this.store,
					columnHeight : this.getColumnHeight()
				});
		this.menu.getEl().on({
					click : function(b) {
						this.menu.hide();
						b.preventDefault()
					},
					mouseover : function() {
						clearTimeout(this.hideTimeout)
					},
					mouseout : this.deferHideMenu,
					scope : this
				});
		com.atomunion.web.view.HoverMenuButton.menus.push(this.menu)
	},
	deferHideMenu : function() {
		clearTimeout(com.atomunion.web.view.HoverMenuButton.showTimeout);
		if (!this.menu) {
			return
		}
		this.hideTimeout = Ext.Function.defer(function() {
					this.menu.hide()
				}, 200, this)
	},
	deferShowMenu : function() {
		clearTimeout(com.atomunion.web.view.HoverMenuButton.showTimeout);
		com.atomunion.web.view.HoverMenuButton.showTimeout = Ext.Function.defer(
				function() {
					if (!this.menu) {
						this.renderMenu()
					}
					Ext.Array.forEach(com.atomunion.web.view.HoverMenuButton.menus,
							function(a) {
								if (a !== this.menu) {
									a.hide()
								}
							}, this);
					clearTimeout(this.hideTimeout);
					this.menu.show();
					var j = this.getEl().getXY(), n = Ext.ComponentQuery
							.query("classoverview toolbar")[0], k = j[0] - 10, l = n
							.getEl().getXY(), i = n.getWidth(), m = this.menu
							.getEl().getWidth(), h = Ext.getCmp("doctabs")
							.getWidth();
					if (m > h) {
						k = 0
					} else {
						if ((k + m) > h) {
							k = h - m - 30
						}
					}
					if (k < l[0]) {
						k = l[0]
					}
					this.menu.getEl().setStyle({
								left : k + "px",
								top : (j[1] + 25) + "px"
							})
				}, 200, this)
	},
	getStore : function() {
		return this.store
	}
});