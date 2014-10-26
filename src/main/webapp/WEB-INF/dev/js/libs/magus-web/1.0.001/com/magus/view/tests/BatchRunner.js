Ext.define("com.atomunion.web.view.tests.BatchRunner", {
			extend : "Ext.container.Container",
			requires : ["com.atomunion.web.view.examples.Inline"],
			initComponent : function() {
				this.addEvents("start", "finish", "statuschange");
				this.callParent(arguments)
			},
			run : function(b) {
				this.fireEvent("start");
				this.runNext({
							pass : 0,
							fail : 0,
							total : b.length,
							remaining : b
						})
			},
			runNext : function(h) {
				this.fireEvent("statuschange", h);
				if (!h.remaining || h.remaining.length < 1) {
					this.fireEvent("finish");
					return
				}
				var j = h.remaining.shift();
				var i = j.get("options");
				i.preview = false;
				var f = "var alert = function(){};\n";
				var g = Ext.create("com.atomunion.web.view.examples.Inline", {
							cls : "doc-test-preview",
							height : 0,
							value : f + j.get("code"),
							options : i,
							listeners : {
								previewsuccess : function(a) {
									this.onSuccess(j, h)
								},
								previewfailure : function(a, b) {
									this.onFailure(j, h, b)
								},
								scope : this
							}
						});
				this.removeAll();
				this.add(g);
				g.showPreview()
			},
			onSuccess : function(d, c) {
				d.set("status", "success");
				d.commit();
				c.pass++;
				this.runNext(c)
			},
			onFailure : function(e, f, d) {
				e.set("status", "failure");
				e.set("message", d.toString());
				e.commit();
				f.fail++;
				this.runNext(f)
			}
		});