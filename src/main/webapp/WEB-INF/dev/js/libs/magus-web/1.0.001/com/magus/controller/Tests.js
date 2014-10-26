Ext.define("com.atomunion.web.controller.Tests", {
			extend : "com.atomunion.web.controller.Content",
			baseUrl : "#!/tests",
			refs : [{
						ref : "viewport",
						selector : "#viewport"
					}, {
						ref : "index",
						selector : "#testsindex"
					}],
			init : function() {
				this.addEvents("loadIndex");
				this.control({
							"#testsgrid" : {
								afterrender : this.loadExamples
							}
						})
			},
			loadIndex : function() {
				this.fireEvent("loadIndex");
				Ext.getCmp("treecontainer").hide();
				this.callParent([true])
			},
			isActive : function() {
				return !!this.getIndex().getTab()
			},
			loadExamples : function() {
				this.getIndex().disable();
				Ext.data.JsonP.request({
							url : this.getBaseUrl() + "/inline-examples.js",
							callbackName : "__inline_examples__",
							success : function(b) {
								this.getIndex().addExamples(b);
								this.getIndex().enable()
							},
							scope : this
						})
			}
		});