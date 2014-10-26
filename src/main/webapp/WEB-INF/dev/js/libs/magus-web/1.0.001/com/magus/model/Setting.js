Ext.define("com.atomunion.web.model.Setting", {
			fields : ["id", "key", "value"],
			extend : "Ext.data.Model",
			requires : ["Ext.data.proxy.LocalStorage"],
			proxy : {
				type : window.localStorage ? "localstorage" : "memory",
				id : com.atomunion.web.data.localStorageDb + "-settings"
			}
		});