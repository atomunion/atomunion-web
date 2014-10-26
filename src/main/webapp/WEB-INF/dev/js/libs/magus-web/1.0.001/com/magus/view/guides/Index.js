Ext.define("com.atomunion.web.view.guides.Index", {
	extend : "Ext.container.Container",
	alias : "widget.guideindex",
	requires : ["com.atomunion.web.view.ThumbList"],
	mixins : ["com.atomunion.web.view.Scrolling"],
	cls : "iScroll",
	margin : "10 0 0 0",
	autoScroll : true,
	initComponent : function() {
		this.items = [{
					xtype : "container",
					html : '<h1 class="eg">Guides</h1>'
				}, Ext.create("com.atomunion.web.view.ThumbList", {
					commentType : "guide",
					itemTpl : [
							'<dd ext:url="#!/guide/{name}"><div class="thumb"><img src="guides/{name}/icon.png"/></div>',
							"<div><h4>{title}</h4><p>{description}</p></div>",
							"</dd>"],
					data : com.atomunion.web.data.guides
				})];
		this.callParent(arguments)
	},
	getTab : function() {
		var b = (com.atomunion.web.data.guides || []).length > 0;
		return b ? {
			cls : "examples",
			href : "#!/guide",
			tooltip : "Guides"
		} : false
	},
	updateCommentCounts : function() {
		this.down("thumblist").updateCommentCounts()
	}
});
