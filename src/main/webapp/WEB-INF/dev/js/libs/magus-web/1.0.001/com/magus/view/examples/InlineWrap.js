Ext.define("com.atomunion.web.view.examples.InlineWrap", {
			requires : ["com.atomunion.web.view.examples.Inline",
					"com.atomunion.web.view.examples.InlineToolbar"],
			constructor : function(c) {
				this.pre = c;
				var d = this.parseOptions(c.className);
				this.initToolbar();
				if (d.preview) {
					this.replacePre(d)
				} else {
					this.tb.on("buttonclick", function(a) {
								d.preview = (a === "preview");
								this.replacePre(d)
							}, this, {
								single : true
							})
				}
			},
			parseOptions : function(c) {
				var d = {};
				Ext.Array.forEach(c.split(/ +/), function(a) {
							if (a === "phone" || a === "miniphone"
									|| a === "tablet") {
								d.device = a
							} else {
								if (a === "ladscape" || a === "portrait") {
									d.orientation = a
								} else {
									d[a] = true
								}
							}
						});
				return d
			},
			initToolbar : function() {
				var b = document.createElement("div");
				this.pre.parentNode.insertBefore(b, this.pre);
				this.tb = Ext.create("com.atomunion.web.view.examples.InlineToolbar", {
							renderTo : b
						})
			},
			replacePre : function(d) {
				var c = document.createElement("div");
				this.pre.parentNode.replaceChild(c, this.pre);
				Ext.create("com.atomunion.web.view.examples.Inline", {
							height : 200,
							renderTo : c,
							value : Ext.String.htmlDecode(Ext.util.Format
									.stripTags(this.pre.innerHTML)),
							options : d,
							toolbar : this.tb
						})
			}
		});