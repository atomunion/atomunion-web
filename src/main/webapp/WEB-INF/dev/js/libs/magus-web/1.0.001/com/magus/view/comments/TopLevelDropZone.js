Ext.define("com.atomunion.web.view.comments.TopLevelDropZone", {
			extend : "Ext.dd.DropZone",
			getTargetFromEvent : function(b) {
				return b.getTarget("a.side.toggleComments", 10)
			},
			onNodeEnter : function(g, f, h, e) {
				if (this.isValidDropTarget(e)) {
					Ext.fly(g).addCls("drop-target-hover")
				}
			},
			onNodeOut : function(g, f, h, e) {
				Ext.fly(g).removeCls("drop-target-hover")
			},
			onNodeOver : function(g, f, h, e) {
				if (this.isValidDropTarget(e)) {
					return this.dropAllowed
				} else {
					return false
				}
			},
			isValidDropTarget : function(b) {
				return !!b.comment.get("parentId")
			},
			onNodeDrop : function(g, f, h, e) {
				if (this.isValidDropTarget(e)) {
					this.onValidDrop(e.comment, undefined);
					return true
				}
				return false
			},
			onValidDrop : Ext.emptyFn
		});
