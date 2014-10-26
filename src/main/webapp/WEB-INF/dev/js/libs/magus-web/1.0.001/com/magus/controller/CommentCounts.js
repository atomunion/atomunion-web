Ext.define("com.atomunion.web.controller.CommentCounts", {
			extend : "Ext.app.Controller",
			requires : ["com.atomunion.web.Comments"],
			refs : [{
						ref : "class",
						selector : "classoverview"
					}, {
						ref : "classIndex",
						selector : "#classindex"
					}, {
						ref : "guide",
						selector : "#guide"
					}, {
						ref : "guideIndex",
						selector : "#guideindex"
					}, {
						ref : "video",
						selector : "#video"
					}, {
						ref : "videoIndex",
						selector : "#videoindex"
					}],
			init : function() {
				com.atomunion.web.Comments.on("countChange", this.updateCounts, this)
			},
			updateCounts : function(c, d) {
				this.getClass().updateCommentCounts();
				this.getClassIndex().updateCommentCounts();
				this.getGuide().updateCommentCounts();
				this.getGuideIndex().updateCommentCounts();
				this.getVideo().updateCommentCounts();
				this.getVideoIndex().updateCommentCounts()
			}
		});