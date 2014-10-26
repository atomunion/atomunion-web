Ext.define("com.atomunion.web.view.cls.Container", {
			extend : "Ext.container.Container",
			alias : "widget.classcontainer",
			requires : ["com.atomunion.web.view.cls.Header",
					"com.atomunion.web.view.cls.Overview"],
			layout : "border",
			padding : "5 10 0 10",
			initComponent : function() {
				this.items = [Ext.create("com.atomunion.web.view.cls.Header", {
									region : "north"
								}), Ext.create("com.atomunion.web.view.cls.Overview", {
									region : "center"
								})];
				this.callParent(arguments)
			}
		});