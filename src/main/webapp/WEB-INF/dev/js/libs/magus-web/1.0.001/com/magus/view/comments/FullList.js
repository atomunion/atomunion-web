Ext.define("com.atomunion.web.view.comments.FullList", {
	extend : "Ext.panel.Panel",
	alias : "widget.commentsFullList",
	requires : ["com.atomunion.web.Settings", "com.atomunion.web.Auth", "com.atomunion.web.Comments",
			"com.atomunion.web.view.comments.List", "com.atomunion.web.view.comments.Pager"],
	componentCls : "comments-full-list",
	dockedItems : [{
		xtype : "container",
		dock : "top",
		height : 35,
		html : [
				'<h1 style="float:left;">Comments</h1>',
				'<p style="float:left; margin: 5px 0 0 25px">',
				'<label style="padding-right: 10px;"><input type="checkbox" name="hideRead" id="hideRead" /> Hide read</label>',
				"</p>"].join(" ")
	}],
	layout : "border",
	items : [{
				xtype : "tabpanel",
				cls : "comments-tabpanel",
				plain : true,
				region : "north",
				height : 25,
				items : [{
							title : "Recent"
						}, {
							title : "Votes"
						}]
			}, {
				region : "center",
				xtype : "container",
				autoScroll : true,
				cls : "iScroll",
				items : [{
							xtype : "commentsList",
							id : "recentcomments",
							showTarget : true
						}, {
							xtype : "commentsPager"
						}]
			}],
	afterRender : function() {
		this.callParent(arguments);
		this.initCheckboxes();
		this.initTabs();
		this.setMasked(true)
	},
	load : function(f, e) {
		this.down("commentsList").load(f, e);
		var d = f[f.length - 1];
		if (d) {
			this.down("commentsPager").configure(d)
		} else {
			this.down("commentsPager").reset()
		}
	},
	setMasked : function(c) {
		var d = this.getEl();
		if (d) {
			d[c ? "mask" : "unmask"]()
		}
	},
	initCheckboxes : function() {
		var f = com.atomunion.web.Settings.get("comments");
		var e = Ext.get("hideRead");
		if (e) {
			e.dom.checked = f.hideRead;
			e.on("change", function() {
						this.saveSetting("hideRead", e.dom.checked);
						this.fireEvent("hideReadChange")
					}, this)
		}
		this.setHideReadVisibility();
		var d = com.atomunion.web.App.getController("Auth");
		d.on("available", this.setHideReadVisibility, this);
		d.on("loggedIn", this.setHideReadVisibility, this);
		d.on("loggedOut", this.setHideReadVisibility, this)
	},
	setHideReadVisibility : function() {
		var b = com.atomunion.web.Auth.isModerator();
		Ext.get("hideRead").up("label").setStyle("display",
				b ? "inline" : "none")
	},
	initTabs : function() {
		this.down("tabpanel[cls=comments-tabpanel]").on("tabchange",
				function(d, c) {
					if (c.title === "Recent") {
						this.fireEvent("sortOrderChange", "recent")
					} else {
						this.fireEvent("sortOrderChange", "votes")
					}
				}, this)
	},
	saveSetting : function(d, e) {
		var f = com.atomunion.web.Settings.get("comments");
		f[d] = e;
		com.atomunion.web.Settings.set("comments", f)
	},
	getTab : function() {
		return com.atomunion.web.Comments.isEnabled() ? {
			cls : "comments",
			href : "#!/comment",
			tooltip : "Comments"
		} : false
	}
});