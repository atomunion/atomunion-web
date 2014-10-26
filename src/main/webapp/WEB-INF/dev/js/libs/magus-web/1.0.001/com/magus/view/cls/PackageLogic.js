Ext.define("com.atomunion.web.view.cls.PackageLogic", {
			extend : "com.atomunion.web.view.cls.Logic",
			create : function() {
				this.root = {
					children : [],
					text : "Root"
				};
				this.packages = {
					"" : this.root
				};
				this.privates = [];
				Ext.Array.forEach(this.classes, this.addClass, this);
				this.sortTree(this.root);
				return {
					root : this.root,
					privates : this.privates
				}
			},
			sortTree : function(b) {
				b.children.sort(this.compare);
				Ext.Array.forEach(b.children, this.sortTree, this)
			},
			compare : function(g, h) {
				if (g.leaf === h.leaf) {
					var b = g.text.toLowerCase();
					var a = h.text.toLowerCase();
					return b > a ? 1 : (b < a ? -1 : 0)
				} else {
					return g.leaf ? 1 : -1
				}
			},
			addClass : function(g) {
				if (g["private"] && !this.showPrivateClasses) {
					this.privates.push(this.classNode(g));
					return
				}
				if (this.packages[g.name]) {
					var f = this.packages[g.name];
					var i = this.classNode(g);
					f.iconCls = i.iconCls;
					f.url = i.url
				} else {
					var h = this.packageName(g.name);
					var j = this.packages[h] || this.addPackage(h);
					var i = this.classNode(g);
					this.addChild(j, i);
					this.packages[g.name] = i
				}
			},
			addPackage : function(e) {
				var g = this.packageName(e);
				var h = this.packages[g] || this.addPackage(g);
				var f = this.packageNode(e);
				this.addChild(h, f);
				this.packages[e] = f;
				return f
			},
			addChild : function(d, c) {
				d.children.push(c);
				if (d.leaf) {
					d.leaf = false
				}
			},
			classNode : function(b) {
				return {
					text : this.shortName(b.name),
					url : "#!/api/" + b.name,
					iconCls : b.icon,
					cls : b["private"] ? "private" : "",
					leaf : true,
					children : []
				}
			},
			packageNode : function(b) {
				return {
					text : this.shortName(b),
					iconCls : "icon-pkg",
					leaf : false,
					children : []
				}
			},
			packageName : function(b) {
				return b.slice(0, -this.shortName(b).length - 1) || ""
			},
			shortName : function(d) {
				var c = d.split(/\./);
				return c.pop()
			}
		});