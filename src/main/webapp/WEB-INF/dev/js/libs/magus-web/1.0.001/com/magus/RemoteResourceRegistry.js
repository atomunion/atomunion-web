Ext.define("com.atomunion.web.RemoteResourceRegistry", {
			extend : "com.atomunion.web.ResourceRegistry",
			singleton : true,
			
			request : function(v, start, limit, callback, scope) {
				if (callback && !scope) {
					scope = this;
				}
				Ext.Ajax.request({
							url : "security/resources/guides/" + v,
							params : {
								format : 'json',
								start : start,
								limit : limit
							},
							method : "GET",
							// cors : true,
							success : function(response, opts) {
								var b = Ext.JSON.decode(response.responseText);
								if (b.success && b.data) {
									if (callback) {
										callback.call(scope, {
													total : b.total,
													data : b.data

												});
									}
								}
							},
							failure : function(response, opts) {
							},
							scope : this
						})
			}
		});