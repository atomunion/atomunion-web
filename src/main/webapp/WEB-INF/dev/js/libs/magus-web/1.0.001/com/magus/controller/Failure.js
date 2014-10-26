Ext.define("com.atomunion.web.controller.Failure", {
	extend : "com.atomunion.web.controller.Content",
	baseUrl : "#",
	refs : [{
				ref : "viewport",
				selector : "#viewport"
			}, {
				ref : "index",
				selector : "#failure"
			}],
	show404 : function(c) {
		var d = new Ext.XTemplate(
				"<h1>Oops...</h1>",
				"<p>{msg}</p>",
				"<p>Maybe it was renamed to something else?<br> Or maybe your internet connection has failed?<br> ",
				"This would be sad. Hopefully it's just a bug on our side.</p>",
				"<p>Most likely you just followed a broken link inside this very documentation. ",
				"Go and report it to the authors of the docs.</p>",
				"<p>But if you think it's a bug in JSDuck documentation-generator itself, feel free to open ",
				"an issue at the <a href='https://github.com/senchalabs/jsduck/issues'>JSDuck issue tracker</a>.</p>",
				"<p>Sorry for all this :(</p>");
		Ext.getCmp("failure").update(d.apply({
					msg : c
				}));
		Ext.getCmp("card-panel").layout.setActiveItem("failure")
	}
});