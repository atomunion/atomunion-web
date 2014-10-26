Ext.define('com.atomunion.web.widgets.view.dd.GridToGrid', {
		extend : 'Ext.container.Container',

		requires : ['Ext.grid.*', 'Ext.data.Store', 'Ext.layout.container.HBox',
			'Ext.layout.container.VBox'],
		xtype : 'dd-grid-to-grid',

		leftTitle : '',
		rightTitle : '',
		leftStore : null,
		rightStore : null,
		columns : [],

		layout : {
			type : 'hbox',
			align : 'stretch',
			padding : 5
		},

		initComponent : function() {
			var group1 = this.id + 'group1', group2 = this.id + 'group2'

			this.items = [{
					itemId : 'grid1',
					flex : 1,
					xtype : 'grid',
					multiSelect : true,
					viewConfig : {
						loadMask : Ext.isIE8 ? false : true,
						plugins : {
							ptype : 'gridviewdragdrop',
							dragGroup : group1,
							dropGroup : group2
						},
						listeners : {
							drop : function(node, data, dropRec, dropPosition) {
							}
						}
					},
					store : this.leftStore,
					columns : this.columns,
					stripeRows : true,
					title : this.leftTitle,
					tools : [{
							type : 'refresh',
							tooltip : '重置',
							scope : this,
							handler : this.onResetClick
						}],
					margins : '0 5 0 0'
				}, {
					width : 70,
					border : false,
					layout : {
						type : 'vbox',
						align : 'stretch',
						pack : 'start'
					},
					items : [{
							border : false,
							flex : 1
						}, {
							xtype : 'button',
							text : '>>',
							border : false,
							height : 30,
							scope : this,
							handler : this.toRight
						}, {
							border : false,
							height : 70
						}, {
							xtype : 'button',
							text : '<<',
							border : false,
							height : 30,
							scope : this,
							handler : this.toLeft
						}, {
							border : false,
							flex : 1
						}]
				}, {
					itemId : 'grid2',
					flex : 1,
					xtype : 'grid',
					multiSelect : true,
					viewConfig : {
						loadMask : Ext.isIE8 ? false : true,
						plugins : {
							ptype : 'gridviewdragdrop',
							dragGroup : group2,
							dropGroup : group1
						},
						listeners : {
							drop : function(node, data, dropRec, dropPosition) {
							}
						}
					},
					store : this.rightStore,
					columns : this.columns,
					stripeRows : true,
					title : this.rightTitle,
					margins : '0 0 0 5'
				}];

			this.callParent();
		},

		onResetClick : function() {
			// refresh source grid
			this.down('#grid1').getStore().reload();

			// purge destination grid
			this.down('#grid2').getStore().reload();
		},

		toRight : function() {
			var leftRecs = this.getComponent('grid1').getSelectionModel().getSelection();
			if (leftRecs.length > 0) {
				var leftStore = this.leftStore;
				var rightStore = this.rightStore;
				Ext.Array.each(leftRecs, function(rec) {
						leftStore.remove(rec);
						rightStore.add(rec);
					})
			}
		},

		toLeft : function() {
			var rightRecs = this.getComponent('grid2').getSelectionModel().getSelection();
			if (rightRecs.length > 0) {
				var leftStore = this.leftStore;
				var rightStore = this.rightStore;
				Ext.Array.each(rightRecs, function(rec) {
						rightStore.remove(rec);
						leftStore.add(rec);
					})
			}
		}
	});