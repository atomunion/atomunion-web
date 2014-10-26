Ext.define("com.atomunion.web.view.comments.Users", {
	alias : "widget.commentsUsers",
	extend : "Ext.panel.Panel",
	componentCls : "comments-users",
	requires : ["com.atomunion.web.Comments", "com.atomunion.web.view.SimpleSelectBehavior",
			"com.atomunion.web.view.comments.FilterField"],
	layout : "border",
	initComponent : function() {
		this.items = [this.tabpanel = Ext.widget("tabpanel", {
					plain : true,
					region : "north",
					height : 50,
					items : [{
								title : "Votes"
							}, {
								title : "Comments"
							}],
					dockedItems : [{
								dock : "bottom",
								items : [{
											xtype : "commentsFilterField",
											emptyText : "Filter users by name...",
											width : 320,
											height : 20,
											listeners : {
												filter : this.onFilter,
												scope : this
											}
										}]
							}],
					listeners : {
						tabchange : this.onTabChange,
						scope : this
					}
				}), this.list = Ext.widget("dataview", {
			region : "center",
			cls : "iScroll users-list",
			autoScroll : true,
			store : Ext.create("Ext.data.Store", {
						fields : ["userName", "score", "emailHash", "mod"]
					}),
			allowDeselect : true,
			tpl : [
					"<ul>",
					'<tpl for=".">',
					"<li>",
					'<span class="score">{score}</span>',
					"{[com.atomunion.web.Comments.avatar(values.emailHash,values.photo)]}",
					'<span class="username <tpl if="mod">moderator</tpl>">{userName}</span>',
					"</li>", "</tpl>", "</ul>"],
			itemSelector : "li"
		})];
		new com.atomunion.web.view.SimpleSelectBehavior(this.list, {
					select : this.onSelect,
					deselect : this.onDeselect,
					scope : this
				});
		this.callParent(arguments)
	},
	afterRender : function() {
		this.callParent(arguments);
		this.fetchUsers("votes")
	},
	onTabChange : function(d, c) {
		if (c.title === "Votes") {
			this.fetchUsers("votes")
		} else {
			this.fetchUsers("comments")
		}
	},
	onFilter : function(b) {
		this.list.getSelectionModel().deselectAll();
		this.list.getStore().clearFilter(true);
		this.list.getStore().filter({
					property : "userName",
					value : b,
					anyMatch : true
				})
	},
	deselectAll : function() {
		this.list.getSelectionModel().deselectAll()
	},
	onSelect : function(b) {
		this.selectedUser = b;
		this.fireEvent("select", b.get("userName"))
	},
	onDeselect : function() {
		this.selectedUser = undefined;
		this.fireEvent("select", undefined)
	},
	fetchUsers : function(b) {
		com.atomunion.web.Comments.request("jsonp", {
					url : "/users",
					method : "GET",
					params : {
						sortBy : b
					},
					success : this.loadUsers,
					scope : this
				})
	},
	loadUsers : function(c) {
		this.list.getStore().loadData(c.data);
		if (this.selectedUser) {
			var d = this.list.getStore().findExact("userName",
					this.selectedUser.get("userName"));
			this.list.getSelectionModel().select(d, false, true)
		}
	}
});