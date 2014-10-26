Ext.define("com.atomunion.web.view.comments.DropZone", {
			extend : "Ext.dd.DropZone",
			constructor : function(d, c) {
				this.view = d;
				this.callParent([d.getEl(), c])
			},
			getTargetFromEvent : function(b) {
				return b.getTarget(this.view.itemSelector, 10)
			},
			onNodeEnter : function(g, f, h, e) {
				if (this.isValidDropTarget(g, e)) {
					Ext.fly(g).addCls("drop-target-hover")
				}
			},
			onNodeOut : function(g, f, h, e) {
				Ext.fly(g).removeCls("drop-target-hover")
			},
			onNodeOver : function(g, f, h, e) {
				if (this.isValidDropTarget(g, e)) {
					return this.dropAllowed
				} else {
					return false
				}
			},
			isValidDropTarget : function(d, e) {
				var f = this.view.getRecord(d);
				return f && f.get("id") !== e.comment.get("id")
			},
			onNodeDrop : function(g, f, h, e) {
				if (this.isValidDropTarget(g, e)) {
					this.onValidDrop(e.comment, this.view.getRecord(g));
					return true
				}
				return false
			},
			onValidDrop : Ext.emptyFn
		});