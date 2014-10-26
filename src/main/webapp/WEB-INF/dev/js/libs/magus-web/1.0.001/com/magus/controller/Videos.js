Ext.define("com.atomunion.web.controller.Videos", {
			extend : "com.atomunion.web.controller.Content",
			baseUrl : "#!/video",
			title : "Videos",
			refs : [{
						ref : "viewport",
						selector : "#viewport"
					}, {
						ref : "index",
						selector : "#videoindex"
					}, {
						ref : "tree",
						selector : "#videotree"
					}],
			init : function() {
				this.addEvents("showVideo");
				this.control({
							"#videotree" : {
								urlclick : function(b) {
									this.loadVideo(b)
								}
							},
							"videoindex > thumblist" : {
								urlclick : function(b) {
									this.loadVideo(b)
								}
							}
						})
			},
			loadIndex : function() {
				Ext.getCmp("treecontainer").showTree("videotree");
				this.callParent()
			},
			loadVideo : function(j, h) {
				var f = false;
				Ext.getCmp("card-panel").layout.setActiveItem("video");
				Ext.getCmp("treecontainer").showTree("videotree");
				var g = j.match(/^#!\/video\/(.*)$/)[1];
				var i = this.getVideo(g);
				if (!i) {
					this.getController("Failure").show404("Video <b>" + g
							+ "</b> was not found.");
					return
				}
				this.getViewport().setPageTitle(i.title);
				if (this.activeUrl !== j) {
					Ext.getCmp("video").load(i);
					f = true
				}
				h || com.atomunion.web.History.push(j);
				this.fireEvent("showVideo", g, {
							reRendered : f
						});
				this.getTree().selectUrl(j);
				this.activeUrl = j
			},
			getVideo : function(b) {
				if (!this.map) {
					this.map = {};
					Ext.Array.forEach(com.atomunion.web.data.videos, function(a) {
								Ext.Array.forEach(a.items, function(d) {
											this.map[d.name] = d
										}, this)
							}, this)
				}
				return this.map[b]
			}
		});