Ext.define("com.atomunion.web.view.comments.Index", {
			extend : "Ext.panel.Panel",
			alias : "widget.commentindex",
			mixins : ["com.atomunion.web.view.Scrolling"],
			requires : ["com.atomunion.web.Comments",
					"com.atomunion.web.view.comments.FullList",
					"com.atomunion.web.view.comments.HeaderMenu",
					"com.atomunion.web.view.comments.Users",
					"com.atomunion.web.view.comments.Targets",
					"com.atomunion.web.view.comments.Tags"],
			componentCls : "comments-index",
			margin : "10 0 0 0",
			layout : "border",
			items : [{
						region : "center",
						xtype : "commentsFullList"
					}, {
						region : "east",
						itemId : "cardPanel",
						layout : "border",
						width : 300,
						margin : "0 0 0 20",
						layout : "card",
						dockedItems : [{
									xtype : "commentsHeaderMenu",
									dock : "top",
									height : 35
								}],
						items : [{
									xtype : "commentsUsers"
								}, {
									xtype : "commentsTargets"
								}, {
									xtype : "commentsTags"
								}]
					}],
			initComponent : function() {
				this.callParent(arguments);
				var d = this.down("#cardPanel");
				var c = {
					users : this.down("commentsUsers"),
					targets : this.down("commentsTargets"),
					tags : this.down("commentsTags")
				};
				this.down("commentsHeaderMenu").on("select", function(a) {
							Ext.Object.each(c, function(b, f) {
										if (b !== a) {
											f.deselectAll()
										}
									});
							d.getLayout().setActiveItem(c[a])
						}, this)
			},
			getTab : function() {
				return com.atomunion.web.Comments.isEnabled() ? {
					cls : "comments",
					href : "#!/comment",
					tooltip : "Comments"
				} : false
			}
		});