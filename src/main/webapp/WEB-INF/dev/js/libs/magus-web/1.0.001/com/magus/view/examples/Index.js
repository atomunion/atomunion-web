Ext.define("com.atomunion.web.view.examples.Index", {
	extend : "Ext.container.Container",
	alias : "widget.exampleindex",
	requires : ["com.atomunion.web.view.ThumbList"],
	mixins : ["com.atomunion.web.view.Scrolling"],
	cls : "iScroll",
	margin : "10 0 0 0",
	autoScroll : true,
	initComponent : function() {
		this.cls += com.atomunion.web.data.touchExamplesUi ? " touch-examples-ui" : "";
		this.items = [{
					xtype : "container",
					html : '<h1 class="eg">Examples</h1>'
				}, Ext.create("com.atomunion.web.view.ThumbList", {
							itemTpl : [
									'<dd ext:url="#!/example/{url}">',
									'<div class="thumb"><img src="images/resource/{iconCls}.png"/></div>',
									"<div><h4>{text}",
									"<tpl if=\"status === 'new'\">",
									'<span class="new-sample"> (New)</span>',
									"</tpl>",
									"<tpl if=\"status === 'updated'\">",
									'<span class="updated-sample"> (Updated)</span>',
									"</tpl>",
									"<tpl if=\"status === 'experimental'\">",
									'<span class="new-sample"> (Experimental)</span>',
									"</tpl>",
									"</h4><p>{desc}</p></div>", "</dd>"],
							data : com.atomunion.web.data.examples.children
						})];
		this.callParent(arguments)
	},
	getTab : function() {
		var b = (com.atomunion.web.data.examples.children || []).length > 0;
		return b ? {
			cls : "guides",
			href : "#!/example",
			tooltip : "系统导航"
		} : false
	}
});