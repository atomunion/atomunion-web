Ext.define("com.atomunion.web.view.home.Index", {
			extend : "Ext.container.Container",
			alias : "widget.homeindex",
			mixins : ["com.atomunion.web.view.Scrolling"],
			requires : ["com.atomunion.web.ContentGrabber"],
			cls : "home iScroll",
			initComponent : function() {
				this.html = '<iframe src="security/home" name="home-index" width="100%" height="100%" frameborder="0"></iframe>';
				this.callParent(arguments);
			},
			afterRender: function() {
				this.callParent(arguments);
			},
			getTab : function() {
				return  {
					cls : "home",
					href : "#!/home",
					tooltip : "Home"
				} 
			}
		});