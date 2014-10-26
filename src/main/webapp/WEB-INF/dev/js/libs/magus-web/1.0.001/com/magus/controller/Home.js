Ext.define("com.atomunion.web.controller.Home", {
			extend : "com.atomunion.web.controller.Content",
			baseUrl : "#!/home",
			refs : [{
						ref : "viewport",
						selector : "#viewport"
					}, {
						ref : "index",
						selector : "#homeindex"
					}],
			init : function() {
				this.addEvents("loadIndex");
			},
			loadIndex : function() {
				this.fireEvent("loadIndex");
				Ext.getCmp("treecontainer").hide();
				
				Ext.getCmp("header").hide();
				Ext.getCmp("footer").hide();
				
				this.callParent([true]);
			},
			gotoDesktop:function(){
				Ext.getCmp("header").show();
				Ext.getCmp("footer").show();
				com.atomunion.web.App.getController("Examples").loadIndex();
			},
			isActive : function() {
				return this.getIndex() && !!this.getIndex().getTab();
			}
		});