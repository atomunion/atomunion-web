Ext.define("com.atomunion.web.view.comments.HeaderMenu", {
			extend : "Ext.container.Container",
			alias : "widget.commentsHeaderMenu",
			componentCls : "comments-header-menu",
			html : ["<h1>", '  <a href="#" class="users selected">Users</a>',
					'  <a href="#" class="targets">Topics</a>',
					'  <a href="#" class="tags">Tags</a>', "</h1>"].join(""),
			afterRender : function() {
				this.callParent(arguments);
				Ext.Array.forEach(["users", "targets", "tags"], function(d) {
							var c = this.getEl().down("a." + d);
							c.on("click", function(b, a) {
										this.getEl().select("a", true)
												.removeCls("selected");
										c.addCls("selected");
										this.fireEvent("select", d)
									}, this, {
										preventDefault : true
									})
						}, this)
			}
		});