Ext.define('com.atomunion.web.model.Resource', {
			extend : 'Ext.data.TreeModel',
			proxy : {
				format : 'json',
				type : 'rest',
				url : 'security/guides',isSynchronous : false,
				reader : {
					type : 'json',
					root : 'data'
				},
				api : {
					create : undefined,
					read : 'security/guides',
					update : undefined,
					destroy : undefined
				}
			},

			fields : [{
						name : '_id',
						type : 'int'
					}, {
						name : 'text',
						type : 'string'
					}, {
						name : 'desc',
						type : 'string'
					}, {
						name : 'lft',
						type : 'string'
					}, {
						name : 'rgt',
						type : 'string'
					}]
		});