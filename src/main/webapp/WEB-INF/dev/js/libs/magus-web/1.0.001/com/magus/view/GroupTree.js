Ext.define("com.atomunion.web.view.GroupTree", {
			extend : "com.atomunion.web.view.DocTree",
			alias : "widget.grouptree",
			initComponent : function() {

				if (this.data) {
					if (Ext.isArray(this.data)) {
						this.root = {
							text : "Root",
							children : this.buildTree(this.data)
						};
					} else {
						this.data.children = this.buildTree(this.data.children)
						this.root = this.data;
					}
				}
				this.callParent();
			},
			buildTree : function(b) {
				return Ext.Array.map(b, function(a) {
							if (!this.convert) {
								return {
									text : a.text || a.title,
									desc : a.desc,
									root : a.root,
									lft : a.lft,
									leaf : a.leaf,
									expanded : a.expanded,
									iconCls : a.iconCls,
									url : a.url,
									href : '#!/example'
											+ (a.url ? '/' + a.url : ''),
									depth : a.depth,
									parentId : a.parentId,
									loaded : a.loaded,
									readOnly : a.readOnly,
									_id : a._id,
									priority : a.priority,
									name : a.name,
									tagName : a.tagName,
									rgt : a.rgt,
									children : (a.children || a.items)
											? this.buildTree(a.children
													|| a.items)
											: []
								}
							} else {
								return this.convert(a)
							}
						}, this)
			}
		});