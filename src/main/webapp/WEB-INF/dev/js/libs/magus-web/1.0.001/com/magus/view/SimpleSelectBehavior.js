Ext.define("com.atomunion.web.view.SimpleSelectBehavior", {
			mixins : {
				observable : "Ext.util.Observable"
			},
			constructor : function(c, d) {
				this.mixins.observable.constructor.call(this, {
							listeners : d
						});
				c.on({
							select : this.onSelect,
							deselect : this.onDeselect,
							scope : this
						})
			},
			onSelect : function(c, d) {
				this.selectedItem = d;
				this.fireEvent("select", d)
			},
			onDeselect : function(c, d) {
				this.selectedItem = undefined;
				Ext.Function.defer(function() {
							if (!this.selectedItem) {
								this.fireEvent("deselect", d)
							}
						}, 10, this)
			}
		});