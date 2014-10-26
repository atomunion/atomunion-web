Ext.define("com.atomunion.web.view.examples.Container", {
	extend : "Ext.container.Container",
	alias : "widget.examplecontainer",
	layout : "fit",
	initComponent : function() {
		this.tpl = new Ext.XTemplate(
				'<table name="{href}" style="height:100%;width:100%;" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">',
				'<tbody><tr><th height="5%" style="overflow: hidden;">',
				'<ul class="jCrumb">',
				'<tpl for="parents">',
				'<tpl if="url">',
				'<li><a class="{iconCls} is-page" href="javascript:void(0)" url="{url}">{text}</a><span>&gt;</span></li>',
				'<tpl else>',
				'<li><a class="{iconCls} not-page" href="javascript:void(0)">{text}</a><span>&gt;</span></li>',
				'</tpl>',
				'</tpl>',
				'<li><a class="{iconCls} is-page" href="javascript:void(0)" url="{url}">{text}</a></li>',
				'</ul>',
				'</th></tr><tr><td height="95%">',
				'<iframe width="100%" height="100%" frameborder="0" src="{url}"></iframe></td>',
				'</tr></tbody></table>');
		this.tplWriteMode = 'append';
		this.tabCache = [];
		this.callParent(arguments)
	},
	load : function(b) {

		this.update({
					href : b.href,
					iconCls : b.iconCls,
					text : b.text,
					url : b.url,
					parents : b.parents
				})

		$(this.getEl().dom).find("table[name='" + b.href + "']")
				.find(".is-page").bind('click', function() {
					$(this).parents('table').find('iframe').attr('src',
							$(this).attr('url'));
					$(this).parent('li').nextAll().remove();
				})
	},
	active : function(b) {
		Ext.Array.each(Ext.query("table:not([name~=" + b.href + "])", this
								.getEl().dom), function(dom, index, list) {
					Ext.get(dom).setVisibilityMode(2);
					Ext.get(dom).setVisible(false, false);
				});
		Ext.Array.each(Ext.query("table[name~=" + b.href + "]",
						this.getEl().dom), function(dom, index, list) {
					Ext.get(dom).setVisibilityMode(2)
					Ext.get(dom).setVisible(true, false);
				});
	},
	clear : function() {
		this.update("")
	}
});