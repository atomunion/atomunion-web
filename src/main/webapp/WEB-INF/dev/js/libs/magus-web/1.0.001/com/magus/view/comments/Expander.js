Ext.define("com.atomunion.web.view.comments.Expander", {
			alias : "widget.commentsExpander",
			extend : "Ext.Component",
			requires : ["com.atomunion.web.Comments",
					"com.atomunion.web.view.comments.TopLevelDropZone"],
			uses : ["com.atomunion.web.view.comments.ListWithForm"],
			componentCls : "comments-expander",
			initComponent : function() {
				this.tpl = new Ext.XTemplate(
						'<a href="#" class="side toggleComments"><span></span></a>',
						'<a href="#" class="name toggleComments">',
						"{[this.renderCount(values.count)]}", "</a>", {
							renderCount : this.renderCount
						});
				this.data = {
					count : this.count
				};
				this.callParent(arguments)
			},
			renderCount : function(b) {
				if (b === 1) {
					return "View 1 comment."
				} else {
					if (b > 1) {
						return "View " + b + " comments."
					} else {
						return "No comments. Click to add."
					}
				}
			},
			afterRender : function() {
				this.callParent(arguments);
				this.getEl().select(".toggleComments").each(function(b) {
							b.on("click", this.toggle, this, {
										preventDefault : true
									})
						}, this);
				new com.atomunion.web.view.comments.TopLevelDropZone(this.getEl()
								.down(".side.toggleComments"), {
							onValidDrop : Ext.Function.bind(this.setParent,
									this)
						})
			},
			setParent : function(c, d) {
				c.setParent(d, this.reload, this)
			},
			toggle : function() {
				this.expanded ? this.collapse() : this.expand()
			},
			expand : function() {
				this.expanded = true;
				this.getEl().addCls("open");
				this.getEl().down(".name").setStyle("display", "none");
				if (this.list) {
					this.list.show()
				} else {
					this.loadComments()
				}
			},
			collapse : function() {
				this.expanded = false;
				this.getEl().removeCls("open");
				this.getEl().down(".name").setStyle("display", "block");
				if (this.list) {
					this.list.hide()
				}
			},
			loadComments : function() {
				this.list = new com.atomunion.web.view.comments.ListWithForm({
							target : this.target,
							newCommentTitle : this.newCommentTitle,
							renderTo : this.getEl(),
							listeners : {
								reorder : this.reload,
								scope : this
							}
						});
				this.reload()
			},
			reload : function() {
				com.atomunion.web.Comments.load(this.target, function(b) {
							this.list.load(b)
						}, this)
			},
			setCount : function(b) {
				this.getEl().down(".name").update(this.renderCount(b))
			}
		});