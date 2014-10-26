Ext.define("com.atomunion.web.model.Tag", {
			extend : "Ext.data.Model",
			requires : ["com.atomunion.web.CommentsProxy"],
			fields : ["tagname", "score"],
			proxy : {
				type : "comments",
				url : "/tags",
				reader : {
					type : "json",
					root : "data"
				}
			}
		});