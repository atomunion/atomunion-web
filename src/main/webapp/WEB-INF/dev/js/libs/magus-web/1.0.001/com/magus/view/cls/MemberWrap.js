Ext.define("com.atomunion.web.view.cls.MemberWrap", {
			constructor : function(b) {
				Ext.apply(this, b);
				this.el = Ext.get(b.el)
			},
			setExpanded : function(b) {
				if (b) {
					if (!this.isExpanded()) {
						this.el.addCls("open")
					}
				} else {
					this.el.removeCls("open")
				}
			},
			isExpanded : function() {
				return this.el.hasCls("open")
			},
			getDefinedIn : function() {
				return this.el.down(".meta .defined-in").getAttribute("rel")
			},
			getMemberId : function() {
				return this.el.getAttribute("id")
			}
		});