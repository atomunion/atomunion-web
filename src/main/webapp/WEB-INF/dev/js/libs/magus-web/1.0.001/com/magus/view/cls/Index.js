Ext.define("com.atomunion.web.view.cls.Index", {
	extend : "Ext.container.Container",
	alias : "widget.classindex",
	requires : ["com.atomunion.web.ContentGrabber", "com.atomunion.web.Comments"],
	mixins : ["com.atomunion.web.view.Scrolling"],
	cls : "class-categories iScroll",
	margin : "15 10",
	autoScroll : true,
	initComponent : function() {
		this.tpl = new Ext.XTemplate(
				'<h1 class="top" style="padding-bottom: 10px">API Documentation</h1>',
				'<tpl if="notice">', '<div class="notice">{notice}</div>',
				"</tpl>", "{categories}");
		this.data = {
			notice : com.atomunion.web.ContentGrabber.get("notice-text"),
			categories : com.atomunion.web.ContentGrabber.get("categories-content")
		};
		this.callParent(arguments)
	},
	afterRender : function() {
		this.callParent(arguments);
		if (!com.atomunion.web.Comments.isEnabled()) {
			return
		}
		this.initComments()
	},
	initComments : function() {
		this.getEl().select("a.docClass").each(function(a) {
					var f = a.getHTML();
					var e = com.atomunion.web.Comments.getClassTotalCount(f);
					if (e) {
						Ext.DomHelper.append(a, com.atomunion.web.Comments
										.counterHtml(e))
					}
				}, this)
	},
	updateCommentCounts : function() {
		if (!this.getEl()) {
			return
		}
		this.getEl().select(".comment-counter-small").remove();
		this.initComments()
	},
	getTab : function() {
		var b = (com.atomunion.web.data.classes || []).length > 0;
		return b ? {
			cls : "classes",
			href : "#!/api",
			tooltip : "API Documentation"
		} : false
	}
});