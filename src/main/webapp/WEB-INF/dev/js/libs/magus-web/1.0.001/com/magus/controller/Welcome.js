Ext.define("com.atomunion.web.controller.Welcome", {
			extend : "com.atomunion.web.controller.Content",
			baseUrl : "#",
			refs : [{
						ref : "viewport",
						selector : "#viewport"
					}, {
						ref : "index",
						selector : "#welcomeindex"
					}],
			init : function() {
				this.addEvents("loadIndex")
			},
			loadIndex : function() {
				this.fireEvent("loadIndex");
				Ext.getCmp("treecontainer").hide();
				this.callParent([true])
			},
			isActive : function() {
				return !!this.getIndex().getTab()
			}
		});