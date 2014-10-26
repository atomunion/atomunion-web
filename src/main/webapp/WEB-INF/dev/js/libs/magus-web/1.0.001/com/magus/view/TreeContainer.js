Ext.define("com.atomunion.web.view.TreeContainer", {
			extend : "Ext.panel.Panel",
			alias : "widget.treecontainer",
			requires : ["com.atomunion.web.view.cls.Tree", "com.atomunion.web.view.GroupTree"],
			cls : "iScroll",
			layout : "card",
			resizable : true,
			resizeHandles : "e",
			collapsible : true,
			hideCollapseTool : true,
			animCollapse : true,
			header : false,
			initComponent : function() {
				this.items = [{}];
				this.callParent()
			},
			showTree : function(b) {
				this.show();
				
				//@ TODO
				var item = this.getItemById(b);
				if(item){
					this.layout.setActiveItem(b);
				}
			},
			getItemById:function(b) {
				var card=null;
				Ext.each(this.layout.getLayoutItems(),function(item,i){
					if(item.id == b){
						card = item;
						return false;
					}
				});
				return card;
			}
		});