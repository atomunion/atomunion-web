Ext.define("com.atomunion.web.view.examples.TouchContainer", {
			extend : "Ext.panel.Panel",
			alias : "widget.touchexamplecontainer",
			requires : ["com.atomunion.web.view.examples.Device"],
			layout : "fit",
			cls : "example-container iScroll",
			autoScroll : true,
			bodyPadding : "10 0 5 0",
			initComponent : function() {
				this.dockedItems = [{
					xtype : "container",
					dock : "top",
					html : [
							'<h1 class="example-title">Example</h1>',
							'<div class="cls-grouping example-toolbar">',
							'<div class="devices">',
							'<button class="phone selected">Phone</button>',
							'<button class="tablet">Tablet</button>',
							"</div>",
							'<span class="separator">&nbsp;</span>',
							'<div class="orientations">',
							'<button class="landscape selected">Landscape</button>',
							'<button class="portrait">Portrait</button>',
							"</div>",
							'<span class="separator">&nbsp;</span>',
							"<div>",
							'<button class="new-window">Open in new window</button>',
							"</div>", "</div>"].join("")
				}];
				this.callParent(arguments)
			},
			load : function(b) {
				this.title = b.title + " Example";
				this.device = Ext.create("com.atomunion.web.view.examples.Device", {
							url : b.url,
							device : b.device || "phone",
							orientation : b.orientation || "landscape"
						});
				this.refresh()
			},
			refresh : function() {
				this.update(this.device.toHtml());
				this.updateScale();
				this.updateTitle();
				this.updateButtons()
			},
			setDevice : function(b) {
				this.device.setDevice(b);
				this.refresh()
			},
			setOrientation : function(b) {
				this.device.setOrientation(b);
				this.refresh()
			},
			updateScale : function() {
				var b = Ext.query("iframe", this.el.dom)[0];
				if (b) {
					b.onload = Ext.Function.bind(function() {
								var d = document.createElement("style");
								var a = "html { overflow: hidden }";
								if (this.device.getDevice() === "tablet") {
									a += "body { font-size: 79.8% !important; }"
								}
								d.innerHTML = a;
								b.contentWindow.document.body.appendChild(d)
							}, this)
				}
			},
			updateTitle : function() {
				Ext.get(Ext.query(".example-title")).update(this.title)
			},
			updateButtons : function() {
				Ext.Array.each(
						Ext.query(".example-toolbar .orientations button"),
						function(b) {
							Ext.get(b).removeCls("selected")
						});
				Ext.get(Ext.query(".example-toolbar .orientations button."
						+ this.device.getOrientation())).addCls("selected");
				Ext.Array.each(Ext.query(".example-toolbar .devices button"),
						function(b) {
							Ext.get(b).removeCls("selected")
						});
				Ext.get(Ext.query(".example-toolbar .devices button."
						+ this.device.getDevice())).addCls("selected")
			},
			clear : function() {
				this.update("")
			}
		});