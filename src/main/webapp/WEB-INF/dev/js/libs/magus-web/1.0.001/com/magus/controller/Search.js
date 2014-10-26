Ext.define("com.atomunion.web.controller.Search", {
	extend : "Ext.app.Controller",
	requires : ["com.atomunion.web.RemoteResourceRegistry",
			"com.atomunion.web.store.Search", "com.atomunion.web.History"],
	stores : ["Search"],
	refs : [{
				ref : "field",
				selector : "#search-field"
			}],
	pageIndex : 1,
	pageSize : 10,
	init : function() {
		this.control({
					"#search-dropdown" : {
						itemclick : function(c, d) {
							this.loadRecord(d)
						},
						changePage : function(c, d) {
							this.pageIndex += d;
							this.search(this.getField().getValue());
							this.keepDropdown()
						},
						footerClick : function(b) {
							this.keepDropdown()
						}
					},
					"#search-field" : {
						keyup : function(m, l) {
							var j = this.getDropdown();
							m.setHideTrigger(m.getValue().length === 0);
							if (l.keyCode === Ext.EventObject.ESC || !m.value) {
								j.hide();
								m.setValue("");
								return
							} else {
								j.show()
							}
							var h = j.getSelectionModel();
							var i = h.getLastSelected();
							var n = j.store.indexOf(i);
							var k = j.store.getCount() - 1;
							if (l.keyCode === Ext.EventObject.UP) {
								if (n === undefined) {
									h.select(0)
								} else {
									h.select(n === 0 ? k : (n - 1))
								}
							} else {
								if (l.keyCode === Ext.EventObject.DOWN) {
									if (n === undefined) {
										h.select(0)
									} else {
										h.select(n === k ? 0 : n + 1)
									}
								} else {
									if (l.keyCode === Ext.EventObject.ENTER) {
										l.preventDefault();
										i && this.loadRecord(i)
									} else {
										this.pageIndex = 1;
										clearTimeout(this.searchTimeout);
										this.searchTimeout = Ext.Function
												.defer(function() {
															this
																	.search(m.value)
														}, 250, this)
									}
								}
							}
						},
						focus : function(b) {
							if (b.value
									&& this.getDropdown().store.getCount() > 0) {
								this.getDropdown().show()
							}
						},
						blur : function() {
							var b = this.getDropdown();
							this.hideTimeout = Ext.Function.defer(b.hide, 500,
									b)
						}
					}
				})
	},
	getDropdown : function() {
		return this.dropdown || (this.dropdown = Ext.getCmp("search-dropdown"))
	},
	keepDropdown : function() {
		clearTimeout(this.hideTimeout);
		this.getField().focus()
	},
	loadRecord : function(b) {
		var url = '';
		switch (b.get("tagName")) {
			case 'SecurityPage' :
				com.atomunion.web.History.navigate('#!/example/' + b.get("url"));
				break;
			case 'SecurityDirectory' :
				com.atomunion.web.History.navigate('#!/example');
				break;
			default :
				break;
		}
		this.getDropdown().hide()
	},
	search : function(h) {
		com.atomunion.web.RemoteResourceRegistry.search(h, this.pageIndex,
				this.pageSize, function(e) {
					if (this.pageIndex <= 0) {
						this.pageIndex = 1;
					} else {
						if (this.pageIndex > Math.ceil(e.total / this.pageSize)) {
							this.pageIndex = Math.ceil(e.total / this.pageSize)
						}
					}

					this.getDropdown().setTotal(e.total);
					this.getDropdown().setStart((this.pageIndex - 1)
							* this.pageSize);
					this.getDropdown().getStore().loadData(e.data);
					this.getDropdown().alignTo("search-field", "bl", [-12, -2]);
					if (e.data.length > 0) {
						this.getDropdown().getSelectionModel().select(0)
					}
				}, this);
	}
});