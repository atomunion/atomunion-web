Ext.define("com.atomunion.web.view.examples.InlineToolbar", {
			extend : "Ext.toolbar.Toolbar",
			componentCls : "inline-example-tb",
			height : 30,
			initComponent : function() {
				this.addEvents("buttonclick");
				this.items = [{
							iconCls : "code",
							padding : "0 2 0 0",
							margin : "0 3 0 0",
							text : "Code Editor",
							handler : this.createEventFirerer("code")
						}, {
							padding : 0,
							margin : "0 3 0 0",
							iconCls : "preview",
							text : "Live Preview",
							handler : this.createEventFirerer("preview")
						}, "->", {
							padding : 0,
							margin : 0,
							iconCls : "copy",
							text : "Select Code",
							handler : this.createEventFirerer("copy")
						}];
				this.callParent(arguments)
			},
			createEventFirerer : function(b) {
				return Ext.Function.bind(function() {
							this.fireEvent("buttonclick", b)
						}, this)
			},
			activateButton : function(b) {
				Ext.Array.each(this.query("button"), function(a) {
							a.removeCls("active")
						});
				Ext.Array.each(this.query("button[iconCls=" + b + "]"),
						function(a) {
							a.addCls("active")
						})
			}
		});
