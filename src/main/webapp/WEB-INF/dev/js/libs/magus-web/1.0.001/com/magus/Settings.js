Ext.define("com.atomunion.web.Settings", {
			extend : "com.atomunion.web.LocalStore",
			singleton : true,
			requires : "com.atomunion.web.store.Settings",
			storeName : "com.atomunion.web.store.Settings",
			defaults : {
				show : {
					"public" : true,
					"protected" : false,
					"private" : false,
					deprecated : false,
					removed : false,
					inherited : true,
					accessor : true
				},
				comments : {
					hideRead : false
				},
				showPrivateClasses : false,
				classTreeLogic : "PackageLogic"
			},
			set : function(d, f) {
				var e = this.store.findExact("key", d);
				if (e > -1) {
					this.store.removeAt(e);
				}
				this.store.add({
							key : d,
							value : f
						});
				this.syncStore();
			},
			get : function(c) {
				var d = this.store.findExact("key", c);
				return d > -1
						? this.store.getAt(d).get("value")
						: this.defaults[c];
			}
		});