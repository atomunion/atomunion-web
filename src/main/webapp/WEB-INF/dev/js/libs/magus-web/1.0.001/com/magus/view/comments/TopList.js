Ext.define("com.atomunion.web.view.comments.TopList", {
	extend : "Ext.panel.Panel",
	componentCls : "comments-toplist",
	requires : ["com.atomunion.web.view.SimpleSelectBehavior",
			"com.atomunion.web.view.comments.FilterField"],
	layout : "border",
	displayField : "text",
	scoreField : "score",
	filterEmptyText : "Filter by name...",
	initComponent : function() {
		this.items = [this.tabpanel = Ext.widget("tabpanel", {
							plain : true,
							region : "north",
							height : 50,
							items : [{
										title : "By comment count"
									}],
							dockedItems : [{
										dock : "bottom",
										items : [{
													xtype : "commentsFilterField",
													emptyText : this.filterEmptyText,
													width : 320,
													height : 20,
													listeners : {
														filter : this.onFilter,
														scope : this
													}
												}]
									}]
						}), this.list = Ext.widget("dataview", {
							region : "center",
							cls : "iScroll top-list",
							autoScroll : true,
							store : new Ext.data.Store({
										model : this.model
									}),
							allowDeselect : true,
							tpl : [
									"<ul>",
									'<tpl for=".">',
									"<li>",
									'<span class="score">{' + this.scoreField
											+ "}</span>",
									'<span class="text">{' + this.displayField
											+ "}</span>", "</li>", "</tpl>",
									"</ul>"],
							itemSelector : "li"
						})];
		new com.atomunion.web.view.SimpleSelectBehavior(this.list, {
					select : this.onSelect,
					deselect : this.onDeselect,
					scope : this
				});
		this.callParent(arguments)
	},
	afterRender : function() {
		this.callParent(arguments);
		this.list.getStore().load()
	},
	onFilter : function(b) {
		this.list.getSelectionModel().deselectAll();
		this.list.getStore().clearFilter(true);
		this.list.getStore().filter({
					property : this.displayField,
					value : b,
					anyMatch : true
				})
	},
	deselectAll : function() {
		this.list.getSelectionModel().deselectAll()
	},
	onSelect : function(b) {
		this.fireEvent("select", b)
	},
	onDeselect : function() {
		this.fireEvent("select", undefined)
	}
});