Ext.define("com.atomunion.web.view.Header", {
			extend : "Ext.container.Container",
			alias : "widget.docheader",
			contentEl : "header-content",
			initComponent : function() {
				if (com.atomunion.web.otherProducts) {
					this.style = "cursor: pointer;", this.cls = "dropdown";
					this.menu = Ext.create("Ext.menu.Menu", {
								renderTo : Ext.getBody(),
								plain : true,
								items : com.atomunion.web.otherProducts
							})
				}
				this.callParent()
			},
			listeners : {
				afterrender : function(b) {
					if (this.menu) {
						b.el.addListener("click", function(d, a) {
									this.menu.showBy(this.el, "bl", [120, 0])
								}, this)
					}
				}
			}
		});