Ext.define("com.atomunion.web.view.ThumbList", {
	extend : "Ext.view.View",
	alias : "widget.thumblist",
	requires : ["com.atomunion.web.Comments"],
	cls : "thumb-list",
	itemSelector : "dl",
	urlField : "url",
	commentType : "",
	itemTpl : [],
	initComponent : function() {
		this.addEvents("urlclick");
		Ext.Array.forEach(this.data, function(c, d) {
					c.id = "sample-" + d
				});
		this.store = Ext.create("Ext.data.JsonStore", {
					fields : ["id", "text","desc", "url","icon","children"]
				});
		// this.data的第一级必须为SecurityDictionery
		this.store.loadData(this.flattenSubgroups(this.data));
		// this.store.loadData(this.data);
		
		this.tpl = new Ext.XTemplate(Ext.Array
				.flatten(["<div>", '<tpl for=".">',
						'<div><a name="{id}"></a><h2><div>{text}</div></h2>',
						"<dl>", '<tpl for="children">', this.itemTpl, "</tpl>",
						'<div style="clear:left"></div></dl></div>', "</tpl>",
						"</div>"]));
		this.itemTpl = undefined;
		this.data = undefined;
		this.on("viewready", function() {
					this.initHover();
					if (com.atomunion.web.Comments.isEnabled()) {
						this.initComments()
					}
				}, this);
		this.callParent(arguments)
	},
	initHover : function() {
		this.getEl().on("mouseover", function(c, d) {
					Ext.get(d).addCls("over")
				}, this, {
					delegate : "dd"
				});
		this.getEl().on("mouseout", function(c, d) {
					Ext.get(d).removeCls("over")
				}, this, {
					delegate : "dd"
				})
	},
	initComments : function() {
		this.getEl().select("dd").each(function(e) {
			var d = e.getAttributeNS("ext", this.urlField).replace(/^.*\//, "");
			var f = com.atomunion.web.Comments.getCount([this.commentType, d, ""]);
			if (f) {
				Ext.DomHelper.append(e.down("p"), com.atomunion.web.Comments
								.counterHtml(f))
			}
		}, this);
	},
	updateCommentCounts : function() {
		if (!this.getEl()) {
			return
		}
		this.getEl().select(".comment-counter-small").remove();
		this.initComments();
	},
	flattenSubgroups : function(c) {
		function d(a) {
			var r = function(items,d){
				d && Ext.Array.map(d.children||d.items, function(d1){
					if(d1.tagName=="SecurityPage"){
						items.push(d1);
					}
					r(items,d1);
				});
				return items;
			};
			if (a.children || a.items) {
				return {children:r([],a)}; 
			} else {
				return {};
			}
		}
		 
		return c && c.length?Ext.Array.map(c, function(b) {
				if (b.children||b.items) {
					return Ext.apply({}, d(b),b);
				} else {
					return b;
				}
			}):[];		
	},
	onContainerClick : function(c) {
		var d = c.getTarget("h2", 3, true);
		if (d) {
			d.up("div").toggleCls("collapsed");
		}
	},
	onItemClick : function(h, j, l, i) {
		var k = i.getTarget("dd", 5, true);
		if (k && !i.getTarget("a", 2)) {
			var e = k.getAttributeNS("ext", this.urlField);
			this.fireEvent("urlclick", e)
		}
		return this.callParent(arguments)
	}
});
