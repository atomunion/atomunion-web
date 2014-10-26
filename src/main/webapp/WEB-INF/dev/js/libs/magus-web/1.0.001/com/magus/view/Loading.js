Ext.define("com.atomunion.web.view.Loading", {
			requires : ["com.atomunion.web.view.Introduction"],
			singleton : true,
			constructor : function() {
				this.loading = Ext.get("loading");
			},
			setContext : function(name, version) {
				this.loading && this.loading.down(".title").setHTML(name + " " + version);
			},
			finish : function(user) {
				this.loading && this.loading.hide();
				if (user && user.id && user.tc && !user.tc.skipIntroduction) {
					com.atomunion.web.view.Introduction.execute();
				}
			}
		});