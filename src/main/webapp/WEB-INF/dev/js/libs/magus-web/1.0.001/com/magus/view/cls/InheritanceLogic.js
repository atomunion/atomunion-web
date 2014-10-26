Ext.define("com.atomunion.web.view.cls.InheritanceLogic", {
			extend : "com.atomunion.web.view.cls.Logic",
			create : function() {
				this.root = {
					children : [],
					text : "Root"
				};
				this.privates = [];
				this.subclasses = this.buildLookupTable(this.classes);
				Ext.Array.forEach(this.classes, this.addClass, this);
				if (!this.showPrivateClasses) {
					this.stripPrivateClasses(this.root)
				}
				this.sortTree(this.root);
				return {
					root : this.root,
					privates : this.privates
				}
			},
			sortTree : function(b) {
				b.children.sort(Ext.bind(this.compare, this));
				Ext.Array.forEach(b.children, this.sortTree, this)
			},
			compare : function(g, h) {
				var b = g.text.toLowerCase();
				var a = h.text.toLowerCase();
				return b > a ? 1 : (b < a ? -1 : 0)
			},
			buildLookupTable : function(d) {
				var c = {};
				Ext.Array.forEach(d, function(b) {
							var a = b["extends"];
							if (a && a !== "Object") {
								if (!c[a]) {
									c[a] = []
								}
								c[a].push(b)
							}
						}, this);
				return c
			},
			classNode : function(b) {
				return {
					text : b.name,
					url : "#!/api/" + b.name,
					iconCls : b.icon,
					cls : b["private"] ? "private" : ""
				}
			},
			addClass : function(e) {
				var d = e["extends"];
				if (!d || d === "Object") {
					var f = this.classNode(e);
					this.root.children.push(f);
					f.children = this.getSubclasses(e.name);
					f.leaf = f.children.length === 0
				}
			},
			getSubclasses : function(b) {
				if (!this.subclasses[b]) {
					return []
				}
				return Ext.Array.map(this.subclasses[b], function(a) {
							var d = this.classNode(a);
							d.children = this.getSubclasses(a.name);
							d.leaf = d.children.length === 0;
							return d
						}, this)
			},
			stripPrivateClasses : function(b) {
				b.children = Ext.Array.filter(b.children, function(a) {
							this.stripPrivateClasses(a);
							if (a.cls === "private" && a.children.length === 0) {
								this.privates.push(a);
								return false
							} else {
								return true
							}
						}, this)
			}
		});