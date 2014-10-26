Ext.define("com.atomunion.web.view.search.Dropdown", {
	extend : "Ext.view.View",
	alias : "widget.searchdropdown",
	floating : true,
	autoShow : false,
	autoRender : true,
	toFrontOnShow : true,
	focusOnToFront : false,
	store : "Search",
	id : "search-dropdown",
	overItemCls : "x-view-over",
	trackOver : true,
	itemSelector : "div.item",
	singleSelect : true,
	pageStart : 0,
	pageSize : 10,
	initComponent : function() {
		this.addEvents("changePage", "footerClick");
		this.tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<div class="item">',
				'<div class="icon {icon}"></div>',
				'<div class="meta">{[this.getMetaTags(values.meta)]}</div>',
				'<div class="title {[this.getCls(values.meta)]}">{name}</div>',
				'<div class="class">{fullName}</div>',
				"</div>",
				"</tpl>",
				'<div class="footer">',
				'<tpl if="this.getTotal()">',
				'<a href="#" class="prev">&lt;</a>',
				'<span class="total">{[this.getStart()+1]}-{[this.getEnd()]} of {[this.getTotal()]}</span>',
				'<a href="#" class="next">&gt;</a>', "<tpl else>",
				'<span class="total">Nothing found</span>', "</tpl>", "</div>",
				{
					getCls : function(b) {
						return b["private"] ? "private" : (b.removed
								? "removed"
								: "")
					},
					getMetaTags : function(b) {
						return Ext.Array.map(com.atomunion.web.data.signatures,
								function(a) {
									return b[a.key] ? '<span class="signature '
											+ a.key + '">' + (a["short"])
											+ "</span>" : ""
								}).join(" ")
					},
					getTotal : Ext.bind(this.getTotal, this),
					getStart : Ext.bind(this.getStart, this),
					getEnd : Ext.bind(this.getEnd, this)
				});
		this.on("afterrender", function() {
					this.el.addListener("click", function() {
								this.fireEvent("changePage", this, -1)
							}, this, {
								preventDefault : true,
								delegate : ".prev"
							});
					this.el.addListener("click", function() {
								this.fireEvent("changePage", this, +1)
							}, this, {
								preventDefault : true,
								delegate : ".next"
							});
					this.el.addListener("click", function() {
								this.fireEvent("footerClick", this)
							}, this, {
								delegate : ".footer"
							})
				}, this);
		this.callParent(arguments)
	},
	setTotal : function(b) {
		this.total = b
	},
	getTotal : function() {
		return this.total
	},
	setStart : function(b) {
		this.pageStart = b
	},
	getStart : function(b) {
		return this.pageStart
	},
	getEnd : function(c) {
		var d = this.pageStart + this.pageSize;
		return d > this.total ? this.total : d
	}
});