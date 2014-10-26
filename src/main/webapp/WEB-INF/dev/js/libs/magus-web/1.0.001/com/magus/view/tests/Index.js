Ext.define("com.atomunion.web.view.tests.Index", {
	extend : "Ext.container.Container",
	requires : ["com.atomunion.web.model.Test", "com.atomunion.web.view.tests.BatchRunner"],
	mixins : ["com.atomunion.web.view.Scrolling"],
	alias : "widget.testsindex",
	layout : {
		type : "vbox",
		align : "stretch",
		shrinkToFit : true
	},
	padding : 10,
	initComponent : function() {
		this.store = Ext.create("Ext.data.Store", {
					model : "com.atomunion.web.model.Test",
					data : []
				});
		this.grid = Ext.create("Ext.grid.Panel", {
					itemId : "testsgrid",
					padding : "5 0 5 0",
					autoScroll : true,
					flex : 1,
					store : this.store,
					selModel : {
						mode : "MULTI"
					},
					columns : [{
								xtype : "templatecolumn",
								text : "Name",
								width : 300,
								tpl : '<a href="{href}">{name}</a>'
							}, {
								xtype : "templatecolumn",
								text : "Status",
								width : 80,
								tpl : '<span class="doc-test-{status}">{status}</span>'
							}, {
								text : "Message",
								flex : 1,
								dataIndex : "message"
							}],
					listeners : {
						itemdblclick : function(c, d) {
							this.batchRunner.run([d])
						},
						scope : this
					}
				});
		this.batchRunner = Ext.create("com.atomunion.web.view.tests.BatchRunner", {
					height : 0,
					listeners : {
						start : this.disable,
						finish : this.enable,
						statuschange : this.updateTestStatus,
						scope : this
					}
				});
		this.items = [{
					html : "<h1>Inline examples test page</h1>",
					height : 30
				}, {
					itemId : "testcontainer",
					layout : {
						type : "vbox",
						align : "stretch",
						shrinkToFit : true
					},
					flex : 1,
					items : [{
						itemId : "testcontrols",
						layout : "hbox",
						items : [{
									html : "<b>Double-click</b> to run an example, or",
									margin : "5 5 5 0"
								}, {
									xtype : "button",
									itemId : "run-selected-button",
									text : "Run Selected",
									margin : 5,
									handler : function() {
										this.batchRunner.run(this.grid
												.getSelectionModel()
												.getSelection())
									},
									scope : this
								}, {
									html : "or",
									margin : 5
								}, {
									xtype : "button",
									itemId : "run-all-button",
									text : "Run All Examples",
									margin : 5,
									handler : function() {
										this.batchRunner.run(this.store
												.getRange())
									},
									scope : this
								}, {
									itemId : "testStatus",
									margin : "5 5 5 15"
								}]
					}, this.grid]
				}, this.batchRunner];
		this.callParent(arguments)
	},
	getTab : function() {
		return com.atomunion.web.data.tests ? {
			cls : "tests",
			href : "#!/tests",
			tooltip : "Tests",
			text : "Tests"
		} : false
	},
	addExamples : function(b) {
		this.store.add(b);
		this.setStatus(true, this.store.getCount() + " examples loaded.")
	},
	updateTestStatus : function(d) {
		var c = d.pass + d.fail;
		this.setStatus(d.fail === 0, c + "/" + d.total + " examples tested, "
						+ d.fail + " failures")
	},
	setStatus : function(d, f) {
		var e = d ? "doc-test-success" : "doc-test-failure";
		this.down("#testStatus").update('<span class="' + e + '">' + f
				+ "</span>")
	}
});