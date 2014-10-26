Ext.define("com.atomunion.web.view.comments.Targets", {
			extend : "com.atomunion.web.view.comments.TopList",
			alias : "widget.commentsTargets",
			requires : ["com.atomunion.web.model.Target"],
			model : "com.atomunion.web.model.Target",
			displayField : "text",
			filterEmptyText : "Filter topics by name..."
		});