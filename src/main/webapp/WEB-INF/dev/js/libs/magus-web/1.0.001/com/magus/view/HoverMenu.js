Ext.define("com.atomunion.web.view.HoverMenu", {
	extend : "Ext.view.View",
	requires : ["com.atomunion.web.Comments"],
	alias : "widget.hovermenu",
	componentCls : "hover-menu",
	itemSelector : "div.item",
	deferEmptyText : false,
	columnHeight : 25,
	initComponent : function() {
		this.renderTo = Ext.getBody();
		this.tpl = new Ext.XTemplate(
				"<table>",
				"<tr>",
				"<td>",
				'<tpl for=".">',
				'<div class="item">',
				"{[this.renderLink(values)]}",
				"</div>",
				'<tpl if="xindex % this.columnHeight === 0 && xcount &gt; xindex">',
				"</td><td>", "</tpl>", "</tpl>", "</td>", "</tr>", "</table>",
				{
					columnHeight : this.columnHeight,
					renderLink : function(e) {
						var d = Ext.Array.map(com.atomunion.web.data.signatures,
								function(a) {
									return e.meta[a.key]
											? '<span class="signature ' + a.key
													+ '">' + (a["short"])
													+ "</span>"
											: ""
								}).join(" ");
						var f = com.atomunion.web.Comments.counterHtml(e.commentCount);
						return Ext.String
								.format(
										'<a href="#!/api/{0}" rel="{0}" class="docClass">{1} {2} {3}</a>',
										e.url, e.label, d, f)
					}
				});
		this.callParent()
	}
});