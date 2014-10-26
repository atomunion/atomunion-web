Ext.define("com.atomunion.web.ContentGrabber", {
			singleton : true,
			get : function(f) {
				var e;
				var d = Ext.get(f);
				if (d) {
					e = d.dom.innerHTML;
					d.remove()
				}
				return e
			}
		});