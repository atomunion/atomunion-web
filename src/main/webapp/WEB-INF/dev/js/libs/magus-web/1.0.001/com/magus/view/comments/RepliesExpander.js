Ext.define("com.atomunion.web.view.comments.RepliesExpander", {
	alias : "widget.commentsRepliesExpander",
	extend : "Ext.Component",
	requires : ["com.atomunion.web.Comments"],
	uses : ["com.atomunion.web.view.comments.ListWithForm"],
	componentCls : "comments-replies-expander",
	initComponent : function() {
		this.tpl = new Ext.XTemplate(
				'<a href="#" class="replies-button {[this.getCountCls(values.count)]}">',
				"{[this.renderCount(values.count)]}", "</a>", {
					renderCount : this.renderCount,
					getCountCls : this.getCountCls
				});
		this.data = {
			count : this.count
		};
		this.callParent(arguments)
	},
	renderCount : function(b) {
		if (b === 1) {
			return "1 reply..."
		} else {
			if (b > 1) {
				return b + " replies..."
			} else {
				return "Write reply..."
			}
		}
	},
	getCountCls : function(b) {
		return (b > 0) ? "with-replies" : ""
	},
	afterRender : function() {
		this.callParent(arguments);
		this.getEl().down(".replies-button").on("click", this.toggle, this, {
					preventDefault : true
				})
	},
	toggle : function() {
		this.expanded ? this.collapse() : this.expand()
	},
	expand : function() {
		this.expanded = true;
		this.getEl().down(".replies-button").update("Hide replies.");
		if (this.list) {
			this.list.show()
		} else {
			this.loadComments()
		}
	},
	collapse : function() {
		this.expanded = false;
		this.refreshRepliesButton();
		if (this.list) {
			this.list.hide()
		}
	},
	refreshRepliesButton : function() {
		var b = this.getEl().down(".replies-button");
		b.update(this.renderCount(this.count));
		b.removeCls("with-replies");
		b.addCls(this.getCountCls(this.count))
	},
	loadComments : function() {
		this.list = new com.atomunion.web.view.comments.ListWithForm({
					target : this.target,
					parentId : this.parentId,
					newCommentTitle : "<b>Reply to comment</b>",
					renderTo : this.getEl(),
					listeners : {
						countChange : this.setCount,
						scope : this
					}
				});
		com.atomunion.web.Comments.loadReplies(this.parentId, function(b) {
					this.list.load(b)
				}, this)
	},
	setCount : function(b) {
		this.count = b;
		if (!this.expanded) {
			this.refreshRepliesButton()
		}
	}
});