Ext.define("com.atomunion.web.view.Viewport", {
	extend : "Ext.container.Viewport",
	requires : ["com.atomunion.web.view.search.Container",
			"com.atomunion.web.view.Header", "com.atomunion.web.view.Tabs",
			"com.atomunion.web.view.TreeContainer",
			"com.atomunion.web.view.welcome.Index",
			"com.atomunion.web.view.home.Index",
			"com.atomunion.web.view.auth.HeaderForm",
			"com.atomunion.web.view.comments.Index",
			"com.atomunion.web.view.cls.Index", "com.atomunion.web.view.cls.Container",
			"com.atomunion.web.view.guides.Index",
			"com.atomunion.web.view.guides.Container",
			"com.atomunion.web.view.videos.Index",
			"com.atomunion.web.view.videos.Container",
			"com.atomunion.web.view.examples.Index",
			"com.atomunion.web.view.examples.Container",
			"com.atomunion.web.view.examples.TouchContainer",
			"com.atomunion.web.view.tests.Index"],
	id : "viewport",
	layout : "border",
	defaults : {
		xtype : "container"
	},
	afterRender : function() {
		$('#main-container')
				.append('<nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-left"><h3>Toolbar<span class="cbp-spmenu-remove"></span></h3><p></p></nav>'
						+ '<nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right" id="cbp-spmenu-right"><h3>Toolbar<span class="cbp-spmenu-remove"></span></h3><p></p></nav>'
						+ '<nav class="cbp-spmenu cbp-spmenu-horizontal cbp-spmenu-top" style="height:120px;top: -120px;" id="cbp-spmenu-top"><h3>Notify<span class="cbp-spmenu-remove"></span></h3><p></p></nav>'
						+ '<nav class="cbp-spmenu cbp-spmenu-horizontal cbp-spmenu-bottom" style="height:120px;bottom: -120px;" id="cbp-spmenu-bottom"><h3>Notify<span class="cbp-spmenu-remove"></span></h3><p></p></nav>');
		this.callParent(arguments);
	},
	initComponent : function() {
		this.items = [{
					region : "north",
					id : "header",
					height : 65,
					layout : {
						type : "vbox",
						align : "stretch"
					},
					items : [{
								height : 37,
								xtype : "container",
								layout : "hbox",
								items : [{
											xtype : "docheader"
										}, {
											xtype : "container",
											flex : 1
										}, {
											id : "loginContainer",
											xtype : "authHeaderForm",
											width : 500,
											padding : "10 20 0 0"
										}, {
											xtype : "searchcontainer",
											id : "search-container",
											width : 230,
											margin : "10 0 0 0"
										}]
							}, {
								xtype : "doctabs"
							}]
				}, {
					region : "center",
					layout : "border",
					minWidth : 800,
					id : "main-container",
					items : [{
								region : "west",
								xtype : "treecontainer",
								id : "treecontainer",
								border : 1,
								bodyPadding : "10 9 4 9",
								width : 240
							}, {
								region : "center",
								id : "center-container",
								layout : "fit",
								minWidth : 800,
								border : false,
								padding : "0 0",
								items : {
									id : "card-panel",
									cls : "card-panel",
									xtype : "container",
									layout : {
										type : "card",
										deferredRender : true
									},defaults: {
										padding : "5 5"
									},
									items : [{
												autoScroll : true,
												xtype : "welcomeindex",
												statics : true,
												id : "welcomeindex"
											}, {
												xtype : "container",
												statics : true,
												id : "failure"
											}]
								}
							}]
				}, {
					region : "south",
					id : "footer",
					height : 20,
					contentEl : "footer-content"
				}];
		this.callParent(arguments)
	},
	setPageTitle : function(b) {
		b = Ext.util.Format.stripTags(b);
		if (!this.origTitle) {
			this.origTitle = document.title
		}
		document.title = b ? (b + " - " + this.origTitle) : this.origTitle
	}
});