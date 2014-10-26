Ext.define("com.atomunion.web.view.guides.Container", {
	extend : "Ext.panel.Panel",
	alias : "widget.guidecontainer",
	componentCls : "guide-container",
	mixins : ["com.atomunion.web.view.Scrolling"],
	requires : ["com.atomunion.web.Comments", "com.atomunion.web.view.comments.LargeExpander"],
	initComponent : function() {
		this.addEvents("afterload");
		this.callParent(arguments)
	},
	scrollToEl : function(b) {
		this.scrollToView(b, {
					highlight : true,
					offset : -100
				})
	},
	load : function(b) {
		this.guide = b;
		this.tpl = this.tpl
				|| new Ext.XTemplate(
						com.atomunion.web.data.showPrintButton
								? '<a class="print guide" href="?print=/guide/{name}" target="_blank">Print</a>'
								: "", "{content}");
		this.update(this.tpl.apply(b));
		com.atomunion.web.Syntax.highlight(this.getEl());
		if (com.atomunion.web.Comments.isEnabled()) {
			this.initComments()
		}
		this.fireEvent("afterload")
	},
	initComments : function() {
		this.expander = new com.atomunion.web.view.comments.LargeExpander({
					type : "guide",
					name : this.guide.name,
					el : this.getEl().down(".x-panel-body")
				})
	},
	updateCommentCounts : function() {
		if (!this.expander) {
			return
		}
		this.expander.getExpander().setCount(com.atomunion.web.Comments.getCount([
				"guide", this.guide.name, ""]))
	}
});