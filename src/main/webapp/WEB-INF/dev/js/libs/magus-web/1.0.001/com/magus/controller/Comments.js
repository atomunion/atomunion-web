Ext.define("com.atomunion.web.controller.Comments", {
	extend : "com.atomunion.web.controller.Content",
	baseUrl : "#!/comment",
	title : "Comments",
	requires : ["com.atomunion.web.Settings", "com.atomunion.web.Comments"],
	refs : [{
				ref : "viewport",
				selector : "#viewport"
			}, {
				ref : "index",
				selector : "#commentindex"
			}, {
				ref : "commentsFullList",
				selector : "commentsFullList"
			}],
	recentCommentsSettings : {},
	init : function() {
		this.control({
			commentsFullList : {
				hideReadChange : function() {
					this.fetchRecentComments()
				},
				sortOrderChange : function(b) {
					this.recentCommentsSettings.sortByScore = (b === "votes");
					this.fetchRecentComments()
				}
			},
			commentsPager : {
				loadMore : function(b) {
					this.fetchRecentComments(b)
				}
			},
			commentsUsers : {
				select : function(b) {
					this.recentCommentsSettings.username = b;
					this.fetchRecentComments()
				}
			},
			commentsTargets : {
				select : function(b) {
					this.recentCommentsSettings.targetId = b && b.get("id");
					this.fetchRecentComments()
				}
			},
			commentsTags : {
				select : function(b) {
					this.recentCommentsSettings.tagname = b && b.get("tagname");
					this.fetchRecentComments()
				}
			}
		})
	},
	loadIndex : function() {
		this.fireEvent("loadIndex");
		Ext.getCmp("treecontainer").hide();
		if (!this.recentComments) {
			this.fetchRecentComments();
			this.recentComments = true
		}
		this.callParent([true])
	},
	fetchRecentComments : function(f) {
		var e = com.atomunion.web.Settings.get("comments");
		var d = {
			offset : f || 0,
			limit : 100,
			hideRead : e.hideRead ? 1 : undefined,
			sortByScore : this.recentCommentsSettings.sortByScore
					? 1
					: undefined,
			username : this.recentCommentsSettings.username,
			targetId : this.recentCommentsSettings.targetId,
			tagname : this.recentCommentsSettings.tagname
		};
		this.getCommentsFullList().setMasked(true);
		com.atomunion.web.Comments.request("jsonp", {
					url : "/comments_recent",
					method : "GET",
					params : d,
					success : function(a) {
						this.getCommentsFullList().setMasked(false);
						var b = f > 0;
						this.getCommentsFullList().load(a, b)
					},
					scope : this
				})
	}
});