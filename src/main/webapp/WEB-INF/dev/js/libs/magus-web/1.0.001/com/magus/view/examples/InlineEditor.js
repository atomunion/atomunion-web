Ext.define("com.atomunion.web.view.examples.InlineEditor", {
			extend : "Ext.Panel",
			bodyPadding : 2,
			autoScroll : true,
			componentCls : "inline-example-editor",
			initComponent : function() {
				this.addEvents("init", "change");
				this.on("afterlayout", this.initCodeMirror, this);
				this.callParent(arguments)
			},
			initCodeMirror : function(b) {
				if (!this.codemirror) {
					this.codemirror = CodeMirror(this.body, {
								mode : "javascript",
								indentUnit : 4,
								value : this.value,
								extraKeys : {
									Tab : "indentMore",
									"Shift-Tab" : "indentLess"
								},
								onChange : Ext.Function.bind(function(a) {
											this.fireEvent("change")
										}, this)
							});
					this.fireEvent("init")
				}
			},
			refresh : function() {
				this.codemirror.refresh()
			},
			getValue : function() {
				return this.codemirror
						? this.codemirror.getValue()
						: this.value
			},
			getHeight : function() {
				var b = this.el.down(".CodeMirror-lines");
				return b ? b.getHeight() : undefined
			},
			selectAll : function() {
				var d = this.codemirror.lineCount() - 1;
				var c = this.codemirror.getLine(d).length;
				this.codemirror.setSelection({
							line : 0,
							ch : 0
						}, {
							line : d,
							ch : c
						})
			}
		});