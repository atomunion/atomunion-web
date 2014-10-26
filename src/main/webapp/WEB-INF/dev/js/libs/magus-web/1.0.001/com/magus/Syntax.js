Ext.define("com.atomunion.web.Syntax", {
	singleton : true,
	highlight : function(b) {
		Ext.Array.forEach(Ext.query("pre", b.dom || b), function(a) {
					a = Ext.get(a);
					if (a.child("code")) {
						if (!(a.hasCls("inline-example") && a.hasCls("preview"))) {
							a.addCls("prettyprint")
						}
					} else {
						if (!a.parent(".CodeMirror") && !a.hasCls("hierarchy")) {
							a.addCls("notpretty")
						}
					}
				});
	}
});