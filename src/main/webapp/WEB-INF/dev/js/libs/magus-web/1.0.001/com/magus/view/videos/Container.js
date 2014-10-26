Ext.define("com.atomunion.web.view.videos.Container", {
	extend : "Ext.panel.Panel",
	alias : "widget.videocontainer",
	componentCls : "video-container",
	requires : ["com.atomunion.web.Comments", "com.atomunion.web.view.comments.LargeExpander"],
	initComponent : function() {
		this.callParent(arguments);
		this.on("hide", this.pauseVideo, this)
	},
	pauseVideo : function() {
		var b = document.getElementById("video_player");
		if (b && b.api_pause) {
			b.api_pause()
		}
	},
	load : function(b) {
		this.video = b;
		this.tpl = this.tpl
				|| new Ext.XTemplate(
						'<object width="640" height="360" id="video_player">',
						'<param name="allowfullscreen" value="true" />',
						'<param name="allowscriptaccess" value="always" />',
						'<param name="flashvars" value="api=1" />',
						'<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id={id}&amp;server=vimeo.com&amp;color=4CC208&amp;fullscreen=1" />',
						'<embed src="http://vimeo.com/moogaloop.swf?clip_id={id}&amp;server=vimeo.com&amp;color=4CC208&amp;fullscreen=1" ',
						'type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="640" height="360"></embed>',
						"</object>", "<h1>{title}</h1>",
						"<p>{[this.linkify(values.description)]}</p>", {
							linkify : function(a) {
								return a.replace(/(\bhttps?:\/\/\S+)/ig,
										"<a href='$1'>$1</a>")
							}
						});
		this.update(this.tpl.apply(b));
		if (com.atomunion.web.Comments.isEnabled()) {
			this.initComments()
		}
	},
	initComments : function() {
		this.expander = new com.atomunion.web.view.comments.LargeExpander({
					type : "video",
					name : this.video.name,
					el : this.getEl().down(".x-panel-body")
				})
	},
	updateCommentCounts : function() {
		if (!this.expander) {
			return
		}
		this.expander.getExpander().setCount(com.atomunion.web.Comments.getCount([
				"video", this.video.name, ""]))
	}
});