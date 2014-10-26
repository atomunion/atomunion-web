Ext.define("com.atomunion.web.controller.InlineExamples", {
			extend : "Ext.app.Controller",
			requires : ["com.atomunion.web.view.examples.InlineWrap"],
			init : function() {
				this.control({
							classoverview : {
								resize : this.createResizer(".class-overview"),
								afterload : this.replaceExampleDivs
							},
							guidecontainer : {
								resize : this.createResizer(".guide-container"),
								afterload : this.replaceExampleDivs
							}
						})
			},
			createResizer : function(b) {
				return function() {
					Ext.Array.each(Ext.ComponentQuery.query(b
									+ " .inlineexample"), function(a) {
								if (a.editor && a.isVisible()) {
									a.doLayout()
								}
							})
				}
			},
			replaceExampleDivs : function() {
				Ext.Array.each(Ext.query(".inline-example"), function(b) {
							Ext.create("com.atomunion.web.view.examples.InlineWrap", b)
						}, this)
			}
		});