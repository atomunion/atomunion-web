Ext.define("com.atomunion.web.Tip", {
			singleton : true,
			show : function(g, e, f) {
				f = f || "right";
				this.tips = this.tips || {};
				if (this.tips[f]) {
					var h = this.tips[f];
					h.update(g);
					h.setTarget(e);
					h.show()
				} else {
					var h = this.tips[f] = Ext.create("Ext.tip.ToolTip", {
								anchor : f,
								target : e,
								html : g
							});
					h.show()
				}
			}
		});