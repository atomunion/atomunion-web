Ext.define("com.atomunion.web.view.examples.InlinePreview", {
	extend : "Ext.Panel",
	requires : ["com.atomunion.web.view.examples.Device"],
	bodyPadding : "0 10",
	statics : {
		iframeCounter : 0,
		getNextIframeId : function() {
			this.iframeCounter++;
			return this.iframeCounter.toString()
		}
	},
	options : {},
	constructor : function(b) {
		b = b || {};
		b.iframeId = this.self.getNextIframeId();
		b.id = "inline-preview-" + b.iframeId;
		this.callParent([b]);
		this.addEvents(["previewsuccess", "previewfailure"])
	},
	initComponent : function() {
		this.html = this.getHtml();
		this.callParent(arguments)
	},
	getHtml : function() {
		if (com.atomunion.web.data.touchExamplesUi) {
			return Ext.create("com.atomunion.web.view.examples.Device", {
						url : "eg-iframe.html",
						id : this.iframeId,
						device : this.options.device,
						orientation : this.options.orientation
					}).toHtml()
		} else {
			var b = new Ext.XTemplate('<iframe id="{id}" width="100%" height="100%" frameborder="0"></iframe>');
			return b.apply({
						id : this.iframeId
					})
		}
	},
	update : function(h) {
		var f = this.options;
		var e = Ext.get(this.iframeId);
		var g = Ext.Function.bind(this.iframeCallback, this);
		if (e) {
			e.on("load", function() {
						Ext.Function.defer(function() {
									e.dom.contentWindow.loadInlineExample(h
													+ "\n", f, g)
								}, 100)
					}, this, {
						single : true
					});
			e.dom.src = "eg-iframe.html"
		}
	},
	iframeCallback : function(c, d) {
		if (c) {
			this.fireEvent("previewsuccess", this)
		} else {
			this.fireEvent("previewfailure", this, d)
		}
	},
	getHeight : function() {
		return document.getElementById(this.iframeId).parentNode.clientHeight
	}
});