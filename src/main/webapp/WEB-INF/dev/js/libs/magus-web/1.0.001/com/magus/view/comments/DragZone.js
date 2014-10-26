Ext.define("com.atomunion.web.view.comments.DragZone", {
			extend : "Ext.dd.DragZone",
			constructor : function(d, c) {
				this.view = d;
				this.callParent([d.getEl(), c])
			},
			getDragData : function(f) {
				var d = f.getTarget("img.drag-handle", 10);
				if (d) {
					var e = Ext.fly(d).up(this.view.itemSelector).dom;
					return {
						sourceEl : e,
						repairXY : Ext.fly(e).getXY(),
						ddel : this.cloneCommentEl(e),
						comment : this.view.getRecord(e)
					}
				}
				return false
			},
			cloneCommentEl : function(e) {
				var f = e.cloneNode(true);
				var d = Ext.fly(f).down(".comments-list-with-form");
				d && d.remove();
				f.id = Ext.id();
				return f
			},
			getRepairXY : function() {
				return this.dragData.repairXY
			}
		});