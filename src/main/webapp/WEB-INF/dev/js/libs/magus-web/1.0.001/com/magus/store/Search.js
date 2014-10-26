Ext.define("com.atomunion.web.store.Search", {
			extend : "Ext.data.Store",
			fields : ["name", "fullName", "icon", "url", "meta", "sort","tagName"],
			proxy : {
				type : "memory",
				reader : {
					type : "json"
				}
			}
		});