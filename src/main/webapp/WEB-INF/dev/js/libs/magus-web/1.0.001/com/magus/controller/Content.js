Ext.define("com.atomunion.web.controller.Content", {
			extend : "Ext.app.Controller",
			MIDDLE : 1,
			title : "",
			loadIndex : function(b) {
				b || com.atomunion.web.History.push(this.baseUrl);
				this.getViewport().setPageTitle(this.title);
				Ext.getCmp("doctabs").activateTab(this.baseUrl);
				//@ TODO
				Ext.getCmp("card-panel").layout.setActiveItem(this.getIndex());
				if(this.getIndex()){
					this.getIndex().restoreScrollState();
				}
			},
			opensNewWindow : function(b) {
				return b.button === this.MIDDLE || b.shiftKey || b.ctrlKey;
			},
			getBaseUrl : function() {
				return document.location.href.replace(
						/\/?(index.html|template.html)?#.*/, "");
			}
		});