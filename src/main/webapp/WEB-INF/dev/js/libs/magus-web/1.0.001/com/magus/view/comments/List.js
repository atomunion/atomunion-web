Ext.define("com.atomunion.web.view.comments.List", {
	extend : "Ext.view.View",
	alias : "widget.commentsList",
	requires : ["com.atomunion.web.Auth", "com.atomunion.web.Syntax", "com.atomunion.web.Comments",
			"com.atomunion.web.view.comments.Template", "com.atomunion.web.view.comments.Form",
			"com.atomunion.web.view.comments.TagEditor",
			"com.atomunion.web.view.comments.RepliesExpander",
			"com.atomunion.web.view.comments.DragZone",
			"com.atomunion.web.view.comments.DropZone", "com.atomunion.web.model.Comment",
			"com.atomunion.web.Tip"],
	componentCls : "comments-list",
	itemSelector : "div.comment",
	emptyText : '<div class="loading">Loading...</div>',
	deferEmptyText : false,
	initComponent : function() {
		this.store = Ext.create("Ext.data.Store", {
					model : "com.atomunion.web.model.Comment",
					listeners : {
						update : this.fireChangeEvent,
						scope : this
					}
				});
		this.tpl = com.atomunion.web.view.comments.Template.create({
					showTarget : this.showTarget,
					enableDragDrop : this.enableDragDrop
				});
		this.callParent(arguments);
		this.on("refresh", function() {
					com.atomunion.web.Syntax.highlight(this.getEl());
					this.renderExpanders(this.store.getRange())
				}, this);
		this.on("itemupdate", function(f, e, d) {
					com.atomunion.web.Syntax.highlight(d);
					this.renderExpanders([f])
				}, this)
	},
	renderExpanders : function(b) {
		if (b[0] && b[0].get("parentId")) {
			return
		}
		Ext.Array.forEach(b, function(a) {
					if (a.get("deleted")) {
						return
					}
					new com.atomunion.web.view.comments.RepliesExpander({
								count : a.get("replyCount"),
								target : a.get("target"),
								parentId : a.get("id"),
								renderTo : this.getNode(a)
							})
				}, this)
	},
	afterRender : function() {
		this.callParent(arguments);
		this.mun(this.getTargetEl(), "keydown");
		this.delegateClick("a.voteCommentUp", function(d, c) {
					this.vote(d, c, "up")
				}, this);
		this.delegateClick("a.voteCommentDown", function(d, c) {
					this.vote(d, c, "down")
				}, this);
		this.delegateClick("a.editComment", function(d, c) {
					this.edit(d, c)
				}, this);
		this.delegateClick("a.deleteComment", function(d, c) {
					this.setDeleted(d, c, true)
				}, this);
		this.delegateClick("a.undoDeleteComment", function(d, c) {
					this.setDeleted(d, c, false)
				}, this);
		this.delegateClick("a.readComment", this.markRead, this);
		this.delegateClick("a.add-tag", this.addTag, this);
		this.delegateClick("a.remove-tag", this.removeTag, this);
		if (this.enableDragDrop) {
			new com.atomunion.web.view.comments.DragZone(this);
			new com.atomunion.web.view.comments.DropZone(this, {
						onValidDrop : Ext.Function.bind(this.setParent, this)
					})
		}
	},
	delegateClick : function(e, f, d) {
		this.getEl().on("click", function(b, c) {
					var a = this.getRecord(this.findItemByChild(c));
					if (a) {
						f.call(d, c, a)
					}
				}, this, {
					preventDefault : true,
					delegate : e
				})
	},
	vote : function(e, f, d) {
		if (!com.atomunion.web.Auth.isLoggedIn()) {
			com.atomunion.web.Tip.show("Please login to vote on this comment", e);
			return
		}
		if (f.get("upVote") && d === "up" || f.get("downVote") && d === "down") {
			com.atomunion.web.Tip.show("You have already voted on this comment", e);
			return
		}
		f.vote(d, {
					failure : function(a) {
						com.atomunion.web.Tip.show(a, e)
					}
				})
	},
	edit : function(d, c) {
		c.loadContent(function(a) {
					var b = Ext.get(d).up(".comment").down(".content");
					b.update("");
					new com.atomunion.web.view.comments.Form({
								renderTo : b,
								title : "<b>Edit comment</b>",
								user : com.atomunion.web.Auth.getUser(),
								content : a,
								listeners : {
									submit : function(f) {
										c.saveContent(f)
									},
									cancel : function() {
										this.refreshComment(c)
									},
									scope : this
								}
							})
				}, this)
	},
	refreshComment : function(b) {
		this.refreshNode(this.getStore().findExact("id", b.get("id")))
	},
	setDeleted : function(d, f, e) {
		f.setDeleted(e)
	},
	markRead : function(d, c) {
		c.markRead()
	},
	addTag : function(d, f) {
		var e = new com.atomunion.web.view.comments.TagEditor();
		e.on("select", f.addTag, f);
		e.popup(d)
	},
	removeTag : function(e, f) {
		var d = Ext.get(e).up(".tag").down("b").getHTML();
		f.removeTag(d)
	},
	setParent : function(c, d) {
		c.setParent(d, function() {
					this.fireEvent("reorder")
				}, this)
	},
	load : function(f, e) {
		if (f.length === 0) {
			this.emptyText = ""
		}
		var d = this.store.getProxy().getReader().readRecords(f).records;
		this.store.loadData(d, e);
		this.fireChangeEvent()
	},
	fireChangeEvent : function() {
		var b = function(a) {
			return !a.get("deleted")
		};
		this.fireEvent("countChange", this.getStore().queryBy(b).getCount())
	}
});