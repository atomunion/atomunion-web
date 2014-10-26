Ext.define("com.atomunion.web.view.comments.MemberWrap", {
			extend : "com.atomunion.web.view.cls.MemberWrap",
			requires : ["com.atomunion.web.Comments",
					"com.atomunion.web.view.comments.Expander"],
			constructor : function(d) {
				this.callParent([d]);
				var c = com.atomunion.web.Comments.getCount(this.getTarget());
				if (c > 0) {
					this.updateSignatureCommentCount(c)
				}
			},
			getTarget : function() {
				if (!this.target) {
					this.target = ["class", this.getDefinedIn(),
							this.getMemberId()]
				}
				return this.target
			},
			getExpander : function() {
				if (!this.expander) {
					var b = Ext.DomHelper.append(this.el.down(".long"),
							"<div></div>");
					this.expander = new com.atomunion.web.view.comments.Expander({
								count : com.atomunion.web.Comments.getCount(this
										.getTarget()),
								target : this.getTarget(),
								newCommentTitle : this.getNewCommentTitle(),
								renderTo : b
							})
				}
				return this.expander
			},
			setCount : function(b) {
				this.getExpander().setCount(b);
				this.updateSignatureCommentCount(b)
			},
			updateSignatureCommentCount : function(g) {
				var e = this.el.down(".title");
				var f = e.down(".comment-counter-small");
				if (g > 0) {
					if (f) {
						f.update("" + g)
					} else {
						var h = Ext.DomHelper.append(e, com.atomunion.web.Comments
										.counterHtml(g), true);
						h.on("click", function() {
									this.el.addCls("open");
									this.getExpander().expand();
									this.parent.scrollToEl(this.getExpander()
											.getEl())
								}, this)
					}
				} else {
					if (f) {
						f.remove()
					}
				}
			},
			getNewCommentTitle : function() {
				if (this.getDefinedIn() !== this.className) {
					return [
							"<b>Be aware.</b> This comment will be posted to <b>"
									+ this.getDefinedIn() + "</b> class, ",
							"from where this member is inherited from."]
							.join("")
				} else {
					return undefined
				}
			},
			setExpanded : function(b) {
				this.callParent([b]);
				if (b) {
					this.getExpander().show()
				}
			}
		});