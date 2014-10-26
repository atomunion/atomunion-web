Ext.define("com.atomunion.web.view.videos.Index", {
	extend : "Ext.container.Container",
	alias : "widget.videoindex",
	requires : ["com.atomunion.web.view.ThumbList"],
	mixins : ["com.atomunion.web.view.Scrolling"],
	cls : "iScroll",
	margin : "10 0 0 0",
	autoScroll : true,
	initComponent : function() {
		this.items = [{
					xtype : "container",
					html : '<h1 class="eg">Videos</h1>'
				}, Ext.create("com.atomunion.web.view.ThumbList", {
					commentType : "video",
					itemTpl : [
							'<dd ext:url="#!/video/{name}"><div class="thumb"><img src="{thumb}"/></div>',
							"<div><h4>{title}",
							"</h4><p>{[values.description.substr(0,80)]}...</p></div>",
							"</dd>"],
					data : com.atomunion.web.data.videos
				})];
		this.callParent(arguments)
	},
	getTab : function() {
		var b = (com.atomunion.web.data.videos || []).length > 0;
		return b ? {
			cls : "videos",
			href : "#!/video",
			tooltip : "Videos"
		} : false
	},
	updateCommentCounts : function() {
		this.down("thumblist").updateCommentCounts()
	}
});