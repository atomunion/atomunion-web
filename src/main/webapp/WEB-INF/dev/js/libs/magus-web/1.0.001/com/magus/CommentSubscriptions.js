Ext.define("com.atomunion.web.CommentSubscriptions", {
			constructor : function(b) {
				this.subscriptions = {};
				Ext.Array.each(b, function(a) {
							this.subscriptions[a.join("__")] = true
						}, this)
			},
			has : function(b) {
				return this.subscriptions[b.join("__")]
			},
			set : function(c, d) {
				this.subscriptions[c.join("__")] = d
			}
		});