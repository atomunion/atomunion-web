Ext.define("com.atomunion.web.view.DocTree", {
	extend : "Ext.tree.Panel",
	requires : [ "Ext.Ajax", "Ext.menu.Menu", "Ext.selection.TreeModel" ],
	alias : "widget.doctree",
	cls : "doc-tree iScroll",
	useArrows : true,
	rootVisible : false,
	border : false,
	bodyBorder : false,
	initComponent : function() {
		this.addEvents("urlclick");
		// this.root.expanded = true;
		this.on("itemclick", this.onItemClick, this);
		this.on("beforeitemcollapse", this.handleBeforeExpandCollapse, this);
		this.on("beforeitemexpand", this.handleBeforeExpandCollapse, this);

		this.on("itemcontextmenu", this.onItemcontextmenu, this);

		this.callParent();
		// if(this.autoLoad && this.store)this.store.load();

		this.nodeTpl = new Ext.XTemplate(
				'<a href="javascript:void(0);" rel="{url}">{text}</a>');
		this.contextmenu = Ext.create('Ext.menu.Menu', {
			items : [ {
				text : '添加快捷方式',
				menu : {
					items : [ {
						text : '图标',
						handler : function() {
							this.setShortcut(true, false);
						},
						scope : this
					}, '-', {
						text : '缩略图',
						handler : function() {
							this.setShortcut(true, true);
						},
						scope : this
					} ]
				}
			}, '-', {
				text : '删除快捷方式',
				handler : function() {
					this.setShortcut(false);
				},
				scope : this
			} ]
		});
		this.initNodeLinks()
	},
	initNodeLinks : function() {
		this.getRootNode().cascadeBy(this.applyNodeTpl, this)
	},
	applyNodeTpl : function(b) {
		if (b.get("leaf")) {
			b.set("text", this.nodeTpl.apply({
				text : b.get("text"),
				url : b.raw.url
			}));
			b.commit()
		}
	},
	onItemClick : function(h, j, k, l, i) {
		if (j.raw && j.raw.tagName == 'SecurityPage') {
			var e = j.raw.href || j.data.href;
			if (e) {
				this.fireEvent("urlclick", e, i);
			}
		} else {
			if (!j.isLeaf()) {
				if (j.isExpanded()) {
					j.collapse(false);
				} else {
					j.expand(false);
				}
			}
		}
	},
	onItemcontextmenu : function(view, rec, node, index, e, eOpts) {
		e.stopEvent();

		var menus = this.contextmenu.items.items;
		if (rec.raw && rec.raw.tagName == 'SecurityPage') {
			menus[0].setDisabled(false);
			menus[2].setDisabled(false);
		} else {
			menus[0].setDisabled(true);
			menus[2].setDisabled(true);
		}
		this.contextmenu.showAt(e.getXY());
		return false;
	},
	setShortcut : function(b, isThumb) {
		var selection = this.getSelectionModel().getSelection();
		if (selection && selection.length == 1) {

			Ext.Ajax.request({
				url : com.atomunion.web.data.commentsUrl
						+ "/security/context/shortcuts/resources",
				params : {
					format : 'json',
					isThumb : isThumb,
					color : null,
					resourceIds : [ selection[0].raw._id ],
					_method : b ? "POST" : "DELETE"
				},
				method : "POST",
				success : function(response) {
					var json = Ext.JSON.decode(response.responseText);
					Ext.MessageBox.show({
						title : "操作提示",
						msg : json.msg,
						buttons : Ext.MessageBox.OK,
						icon : (json.success) ? Ext.MessageBox.INFO
								: Ext.MessageBox.ERROR
					});
				}
			});
		}
	},
	selectHref : function(d) {
		var c = this.findNodeByHref(d);
		if (c) {
			c.bubble(function(a) {
				a.expand();
			});
			this.getSelectionModel().select(c);
		} else {
			this.getSelectionModel().deselectAll();
		}
	},
	findNodeByHref : function(b) {
		return this.getRootNode().findChildBy(function(a) {
			return b === a.raw.href;
		}, this, true)
	},
	findRecordByHref : function(d) {
		var c = this.findNodeByHref(d);
		return c ? c.raw : undefined
	},
	handleBeforeExpandCollapse : function(b) {
		if (this.getView().isAnimating(b)) {
			return false
		}
	}
});