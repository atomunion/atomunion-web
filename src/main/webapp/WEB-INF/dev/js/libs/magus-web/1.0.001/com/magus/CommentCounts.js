Ext.define("com.atomunion.web.CommentCounts", {
			constructor : function(b) {
				this.counts = {};
				Ext.Array.each(b, function(a) {
							this.counts[a._id] = a.value
						}, this)
			},
			get : function(b) {
				return this.counts[b.join("__")] || 0
			},
			change : function(c, d) {
				delete this.totals;
				return this.counts[c.join("__")] = this.get(c) + d
			},
			getClassTotal : function(b) {
				if (!this.totals) {
					this.totals = {};
					Ext.Object.each(this.counts, function(a, f) {
								var e = a.split("__");
								if (e[0] === "class") {
									this.totals[e[1]] = (this.totals[e[1]] || 0)
											+ f
								}
							}, this)
				}
				return this.totals[b]
			}
		});