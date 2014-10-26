Ext.define("com.atomunion.web.CommentsProxy", {
			extend : "Ext.data.proxy.JsonP",
			alias : "proxy.comments",
			requires : ["com.atomunion.web.Comments"],
			constructor : function(b) {
				b.url = com.atomunion.web.Comments.buildRequestUrl(b.url);
				this.callParent([b])
			}
		});