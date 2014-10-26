Ext.define("com.atomunion.web.view.comments.Pager", {
			extend : "Ext.Component",
			alias : "widget.commentsPager",
			componentCls : "recent-comments-pager",
			afterRender : function() {
				this.callParent(arguments);
				this.getEl().on("click", function() {
							this
									.fireEvent("loadMore", this.offset
													+ this.limit)
						}, this, {
							preventDefault : true,
							delegate : "a.fetchMoreComments"
						})
			},
			configure : function(b) {
				Ext.apply(this, b);
				this.update(this.getPagerHtml())
			},
			reset : function() {
				this.update("<span></span>No comments found.")
			},
			getPagerHtml : function() {
				var d = this.total_rows || 0;
				var e = this.offset + this.limit;
				var f = Math.min(this.limit, d - e);
				if (d > e) {
					return [
							"<span></span>",
							'<a href="#" class="fetchMoreComments" rel="' + e
									+ '">',
							"Showing comments 1-" + e + " of " + d + ". ",
							"Click to load " + f + " more...", "</a>"].join("")
				} else {
					return "<span></span>That's all. Total " + d + " comments."
				}
			}
		});