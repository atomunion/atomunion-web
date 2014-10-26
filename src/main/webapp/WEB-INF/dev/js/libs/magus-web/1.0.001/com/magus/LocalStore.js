Ext.define("com.atomunion.web.LocalStore", {
			storeName : "",
			init : function() {
				this.localStorage = !!window.localStorage;
				this.store = Ext.create(this.storeName);
				if (this.localStorage) {
					this.cleanup();
					this.store.load();
					if (window.addEventListener) {
						window.addEventListener("storage", Ext.Function.bind(
										this.onStorageChange, this), false)
					} else {
						window.attachEvent("onstorage", Ext.Function.bind(
										this.onStorageChange, this))
					}
				}
			},
			onStorageChange : function(b) {
				b = b || window.event;
				if (b.key === this.store.getProxy().id) {
					this.store.load()
				}
			},
			syncStore : function() {
				this.localStorage && this.store.sync()
			},
			cleanup : function() {
				var f = /-settings/;
				for (var d = 0; d < window.localStorage.length; d++) {
					var e = window.localStorage.key(d);
					if (!f.test(e)) {
						window.localStorage.removeItem(e)
					}
				}
			}
		});