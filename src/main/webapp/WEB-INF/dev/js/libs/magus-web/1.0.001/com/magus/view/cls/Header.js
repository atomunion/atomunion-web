Ext.define("com.atomunion.web.view.cls.Header", {
	extend : "Ext.container.Container",
	padding : "10 0 17 0",
	height : 55,
	alias : "widget.classheader",
	cls : "classheader",
	initComponent : function() {
		this.tpl = Ext
				.create(
						"Ext.XTemplate",
						'<h1 class="{[this.getClass(values)]}">',
						'<tpl if="com.atomunion.web.data.source">',
						'<a href="#" class="class-source-link">{name}',
						'<span class="class-source-tip">View source...</span>',
						"</a>",
						"<tpl else>",
						'<strong class="class-source-link">{name}</strong>',
						"</tpl>",
						'<tpl if="singleton">',
						"<span>singleton</span>",
						"</tpl>",
						"<tpl if=\"values['enum']\">",
						'<span>enum of <b>{[values["enum"].type]}</b></span>',
						"</tpl>",
						"{[this.renderAliases(values.aliases)]}",
						"{[this.renderMetaTags(values.meta)]}",
						"</h1>",
						'<tpl if="com.atomunion.web.data.showPrintButton">',
						'<a class="print" href="?print=/api/{name}" target="_blank">Print</a>',
						"</tpl>", {
							getClass : function(b) {
								if (b.singleton) {
									return "singleton"
								} else {
									if (b.component) {
										return "component"
									} else {
										return "class"
									}
								}
							},
							renderAliases : function(e) {
								var f = {
									widget : "xtype",
									plugin : "ptype",
									feature : "ftype"
								};
								var d = [];
								e && Ext.Object.each(e, function(a, b) {
											d.push((f[a] || a) + ": "
													+ b.join(", "))
										});
								if (d.length > 0) {
									return "<span>" + d.join(", ") + "</span>"
								} else {
									return ""
								}
							},
							renderMetaTags : function(b) {
								return " "
										+ Ext.Array.map(
												com.atomunion.web.data.signatures,
												function(a) {
													return b[a.key]
															? '<span class="signature '
																	+ a.key
																	+ '">'
																	+ (a["long"])
																	+ "</span>"
															: ""
												}).join(" ")
							}
						});
		if (com.atomunion.web.data.source) {
			this.on("render", this.initSourceLink, this)
		}
		this.callParent()
	},
	initSourceLink : function() {
		this.classLinkEvent("click", function() {
					var d = this.loadedCls.files;
					if (d.length === 1) {
						window.open("source/" + d[0].href)
					} else {
						var c = this.createFileMenu(d);
						c.showBy(this, undefined, [58, -20])
					}
				}, this);
		this.classLinkEvent("mouseover", function() {
					this.el.down(".class-source-tip").addCls("hover")
				}, this);
		this.classLinkEvent("mouseout", function() {
					this.el.down(".class-source-tip").removeCls("hover")
				}, this)
	},
	classLinkEvent : function(d, e, f) {
		this.el.on(d, e, f, {
					preventDefault : true,
					delegate : "a.class-source-link"
				})
	},
	createFileMenu : function(b) {
		return new Ext.menu.Menu({
					items : Ext.Array.map(b, function(a) {
								return {
									text : a.filename,
									handler : function() {
										window.open("source/" + a.href)
									}
								}
							}, this)
				})
	},
	load : function(b) {
		this.loadedCls = b;
		this.update(this.tpl.apply(b))
	}
});