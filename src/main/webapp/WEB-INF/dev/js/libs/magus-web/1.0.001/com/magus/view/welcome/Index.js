Ext.define("com.atomunion.web.view.welcome.Index", {
			extend : "Ext.container.Container",
			alias : "widget.welcomeindex",
			mixins : ["com.atomunion.web.view.Scrolling"],
			requires : ["com.atomunion.web.ContentGrabber"],
			cls : "welcome iScroll",
			initComponent : function() {
				this.html = com.atomunion.web.ContentGrabber.get("welcome-content");
				this.hasContent = !!this.html;
				this.callParent(arguments);
			},
			afterRender: function() {
				$('#digiclock').jdigiclock();
				//$('#slider').nivoSlider();
				this.callParent(arguments);
			},
			getTab : function() {
				return this.hasContent ? {
					statics : true,
					cls : "index",
					href : "#",
					tooltip : "Welcome"
				} : false
			}
		});