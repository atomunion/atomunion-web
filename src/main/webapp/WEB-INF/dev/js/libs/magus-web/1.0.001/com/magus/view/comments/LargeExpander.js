Ext.define("com.atomunion.web.view.comments.LargeExpander", {
			requires : ["com.atomunion.web.Comments",
					"com.atomunion.web.view.comments.Expander"],
			html : ['<div class="comments-large-expander">',
					'<h3 class="icon-comment">Comments</h3>', "<div></div>",
					"</div>"].join(""),
			type : "class",
			constructor : function(e) {
				Ext.apply(this, e);
				this.el = Ext.get(e.el);
				var d = Ext.DomHelper.append(this.el, this.html, true)
						.down("div");
				var f = [this.type, this.name, ""];
				this.expander = new com.atomunion.web.view.comments.Expander({
							count : com.atomunion.web.Comments.getCount(f),
							target : f,
							renderTo : d,
							onCountUpdated : this.onCountUpdated
						})
			},
			getExpander : function() {
				return this.expander
			}
		});