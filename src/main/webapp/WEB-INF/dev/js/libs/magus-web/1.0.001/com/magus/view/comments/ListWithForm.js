Ext.define("com.atomunion.web.view.comments.ListWithForm", {
	extend : "Ext.container.Container",
	alias : "widget.commentsListWithForm",
	requires : ["com.atomunion.web.view.comments.List", "com.atomunion.web.view.comments.Form",
			"com.atomunion.web.view.auth.Form", "com.atomunion.web.Comments", "com.atomunion.web.Auth"],
	componentCls : "comments-list-with-form",
	initComponent : function() {
		this.items = [this.list = new com.atomunion.web.view.comments.List({
					enableDragDrop : true
				})];
		this.relayEvents(this.list, ["countChange", "reorder"]);
		this.callParent(arguments)
	},
	load : function(c, d) {
		this.list.load(c, d);
		if (com.atomunion.web.Auth.isLoggedIn()) {
			this.showCommentingForm()
		} else {
			this.showAuthForm()
		}
	},
	showAuthForm : function() {
		if (this.commentingForm) {
			this.remove(this.commentingForm);
			delete this.commentingForm
		}
		if (!this.authForm) {
			this.authForm = new com.atomunion.web.view.auth.Form();
			this.add(this.authForm)
		}
	},
	showCommentingForm : function() {
		if (this.authForm) {
			this.remove(this.authForm);
			delete this.authForm
		}
		if (!this.commentingForm) {
			this.commentingForm = new com.atomunion.web.view.comments.Form({
				title : this.newCommentTitle,
				user : com.atomunion.web.Auth.getUser(),
				userSubscribed : com.atomunion.web.Comments
						.hasSubscription(this.target),
				listeners : {
					submit : this.postComment,
					subscriptionChange : this.subscribe,
					scope : this
				}
			});
			this.add(this.commentingForm)
		}
	},
	postComment : function(b) {
		com.atomunion.web.Comments.post({
					target : this.target,
					parentId : this.parentId,
					content : b,
					callback : function(a) {
						this.commentingForm.setValue("");
						this.list.load([a], true)
					},
					scope : this
				})
	},
	subscribe : function(b) {
		com.atomunion.web.Comments.subscribe(this.target, b, function() {
					this.commentingForm.showSubscriptionMessage(b)
				}, this)
	}
});