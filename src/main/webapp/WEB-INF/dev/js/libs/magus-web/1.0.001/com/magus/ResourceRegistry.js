Ext.define("com.atomunion.web.ResourceRegistry", {
			highlightMatch : function(c, d) {
				c = Ext.apply({}, c);
				c.name = c.name.replace(d, "<strong>$&</strong>");
				c.fullName = c.fullName.replace(d, "<strong>$&</strong>");
				return c
			},
			aliasName : function(b) {
				return b
			},
			search : function(M, start, limit, c, s) {

				if (limit <= 0) {
					limit = 10;
				}

				if (start <= 0) {
					start = 1
				}

				return this.request(M, start, limit,c, s);
			}
		});