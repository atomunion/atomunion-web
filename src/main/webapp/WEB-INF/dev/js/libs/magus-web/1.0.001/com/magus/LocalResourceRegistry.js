Ext.define("com.atomunion.web.LocalResourceRegistry", {
			extend : "com.atomunion.web.ResourceRegistry",
			singleton : true,
			data : com.atomunion.web.data.search,
			constructor: function (config) {
		         this.callParent(arguments);
		     },
			aliasName : function(b) {
				if (!this.altNames) {
					this.altNames = {};
					Ext.each(this.data, function(a) {
								if (a.type === "class" && !/:/.test(a.cls)) {
									this.altNames[a.cls] = a.id
								}
							}, this)
				}
				return this.altNames[b] || b
			},
			request : function(M, start, limit, callback, scope) {
				var r = 5;
				var N = 4;
				var R = 3;
				var G = new Array(r * N * R);
				for (var D = 0; D < G.length; D++) {
					G[D] = []
				}
				var J = r * N * 0;
				var T = r * N * 1;
				var L = r * N * 2;
				var O = r * 0;
				var A = r * 1;
				var Q = r * 2;
				var E = r * 3;
				var H = /[.:]/.test(M);
				var F = Ext.escapeRe(M);
				var z = new RegExp("^" + F + "$", "i");
				var S = new RegExp("^" + F, "i");
				var I = new RegExp(F, "i");
				var P = this.data;
				for (var D = 0, B = P.length; D < B; D++) {
					var K = P[D];

					// TODO
					if (!K.meta)
						K.meta = {}
					// TODO

					var i = H ? K.fullName : K.name;
					var C = K.meta.removed ? E : (K.meta["private"]
							? Q
							: (K.meta.deprecated ? A : O));
					if (z.test(i)) {
						G[K.sort + C + J].push(this.highlightMatch(K, z))
					} else {
						if (S.test(i)) {
							G[K.sort + C + T].push(this.highlightMatch(K, S))
						} else {
							if (I.test(i)) {
								G[K.sort + C + L].push(this
										.highlightMatch(K, I))
							}
						}
					}
				}

				var data = Ext.Array.flatten(G);

				if (callback) {
					callback.call(scope || this, {
								total : data.length,
								data : data.slice((start - 1) * limit, start
												* limit)
							});
				}
			}
		});