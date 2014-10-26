Ext.define("com.atomunion.web.view.examples.Inline", {
			extend : "Ext.Panel",
			alias : "widget.inlineexample",
			requires : ["com.atomunion.web.view.examples.InlineEditor",
					"com.atomunion.web.view.examples.InlinePreview"],
			componentCls : "inline-example-cmp",
			layout : "card",
			border : 0,
			resizable : {
				transparent : true,
				handles : "s",
				constrainTo : false
			},
			maxCodeHeight : 400,
			options : {},
			constructor : function() {
				this.callParent(arguments);
				this.addEvents("previewsuccess", "previewfailure")
			},
			initComponent : function() {
				this.options = Ext.apply({
							device : "phone",
							orientation : "landscape"
						}, this.options);
				this.items = [
						this.editor = Ext.create(
								"com.atomunion.web.view.examples.InlineEditor", {
									cmpName : "code",
									value : this.value,
									listeners : {
										init : this.updateHeight,
										change : this.updateHeight,
										scope : this
									}
								}),
						this.preview = Ext.create(
								"com.atomunion.web.view.examples.InlinePreview", {
									cmpName : "preview",
									options : this.options
								})];
				this.relayEvents(this.preview, ["previewsuccess",
								"previewfailure"]);
				if (this.options.preview) {
					this.activeItem = 1;
					if (this.toolbar) {
						this.toolbar.activateButton("preview")
					}
				} else {
					this.activeItem = 0;
					if (this.toolbar) {
						this.toolbar.activateButton("code")
					}
				}
				this.on("afterrender", this.init, this);
				this.callParent(arguments)
			},
			init : function() {
				var b = this.layout.getActiveItem();
				if (b.cmpName === "preview") {
					this.showPreview()
				}
				this.updateHeight();
				if (this.toolbar) {
					this.initToolbarEvents()
				}
			},
			initToolbarEvents : function() {
				this.toolbar.on("buttonclick", function(b) {
							if (b === "code") {
								this.showCode()
							} else {
								if (b === "preview") {
									this.showPreview()
								} else {
									if (b === "copy") {
										this.showCode();
										this.editor.selectAll()
									}
								}
							}
						}, this)
			},
			showCode : function() {
				this.layout.setActiveItem(0);
				this.updateHeight();
				if (this.toolbar) {
					this.toolbar.activateButton("code")
				}
			},
			showPreview : function() {
				this.preview.update(this.editor.getValue());
				this.layout.setActiveItem(1);
				this.updateHeight();
				if (this.toolbar) {
					this.toolbar.activateButton("preview")
				}
			},
			updateHeight : function() {
				var d = this.preview.getHeight();
				var e = this.editor.getHeight();
				var f = 30;
				if (com.atomunion.web.data.touchExamplesUi && d > 0) {
					this.setHeight(d + f)
				} else {
					if (e > 0) {
						this.setHeight(Ext.Number.constrain(e + f, 0,
								this.maxCodeHeight))
					}
				}
			}
		});