Ext.define("com.atomunion.web.model.Target", {
			extend : "Ext.data.Model",
			requires : ["com.atomunion.web.CommentsProxy"],
			fields : ["id", "type", "cls", "member", "score", {
				name : "text",
				convert : function(e, f) {
					var d = f.data;
					if (d.type === "class") {
						return d.cls
								+ (d.member ? "#"
										+ d.member.replace(/^.*-/, "") : "")
					} else {
						return d.type + " " + d.cls
					}
				}
			}],
			proxy : {
				type : "comments",
				url : "/targets",
				reader : {
					type : "json",
					root : "data"
				}
			}
		});