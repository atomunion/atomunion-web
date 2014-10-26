Ext.define("com.atomunion.web.view.comments.Tags", {
			extend : "com.atomunion.web.view.comments.TopList",
			alias : "widget.commentsTags",
			requires : ["com.atomunion.web.model.Tag"],
			model : "com.atomunion.web.model.Tag",
			displayField : "tagname",
			filterEmptyText : "Filter tags by name..."
		});