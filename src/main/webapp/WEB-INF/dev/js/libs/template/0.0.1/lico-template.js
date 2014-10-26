(function($) {
	/**
	 * @param column
	 * @param row
	 */
	String.prototype.ellipse = function(column, row) {
		var i = 0, len = this.length, ell = '', result = '';
		for (i = 0; i < column && i < 3; i++) {
			ell += '.';
		}
		for (i = 0; i < row; i++) {
			if (len - i * column > column) {
				if (i == row - 1) {
					result += this.substring(i * column, (i + 1) * column
									- ell.length)
							+ ell;
				} else {
					result += this.substring(i * column, (i + 1) * column);
				}
			} else if (len > i * column) {
				result += this.substring(i * column, len);
			}
			result += '<br/>';
		}
		return result;
	};
	Array.prototype.contains = function(elem) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == elem) {
				return true;
			}
		}
		return false;
	};
	if (!$.fn.licoTemplate) {
		var licoTemplate = function() {
			return {
				version : '0.0.1',
				options : {
					template : [],
					store:{
					
					},
					setUpBefore: function(data) {
						return data;
					},
					setUp : function(data) {
						return data;
					},
					getTemplate : function(result, data, opts) {
					},
					getTemplates : function(results, data, opts) {
					}
				},
				getTemplate : function(result, data, opts) {
					(opts.getTemplate || $.fn.licoTemplate.getTemplate).call(
							$.fn.licoTemplate, result, data);
				},
				
				getTemplates : function(results, data, opts) {
					(opts.getTemplates || $.fn.licoTemplate.getTemplates).call(
							$.fn.licoTemplate, results, data);
				},
				parse : function(opts) {
					var scope = this;
					$.licoStore($.extend({}, opts.store, {
						getData : function(r) {
							if (r.data.success) {
								var data = r.data.data,templates=[];
								if (opts.setUpBefore) {
									data = opts.setUpBefore.call(opts, data);
								}
								if (Object.prototype.toString.apply(data) === "[object Array]") {
									$.each(data, function(i, d) {
										var d2 = scope.formatData(d, opts);
										var template = scope.initTemplate(d2,
												opts)
										scope.getTemplate(template, d2, opts);
										templates.push(template);
									});
								} else {
									var d = scope
											.formatData(data, opts);
									var template = scope.initTemplate(d,
											opts);
									scope.getTemplate(template, d, opts);
									templates.push(template);
								}

								scope.getTemplates(templates, d, opts);
							} else {
								alert('success:' + r.data.success
										+ '\nmessage:' + r.data.msg);
							}
						}
					}));
				},
				formatData : function(data, opts) {
					if (opts.setUp) {
						data = opts.setUp.call(opts, data);
					}
					return data;
				},
				initTemplate : function(data, opts) {
					if (!data) {
						return null;
					}
					var result = opts.template.join('');
					result = result.replace(
							/([{]+)\s*([A-z]|[0-9]|[_]|[.])*\s*([}]+)/gim,
							function(rege) {
								//TODO 以点分隔
								var value = data;
								if(rege){
									var pro = rege.substring(1, rege.length - 1);
									var pros = pro.split('.');
									
									for(var i=0;i<pros.length;i++){
										if(!value){
											break;
										}
										value = value[pros[i]];
									}
									return value;
								}
								return null;
							});
					var temp = $(result);
					if (data.listeners) {
						$.each(data.listeners, function(i, v) {
									temp.bind(i, function() {
												v.call(data);
											});
								});
					}
					return temp;
				}
			};
		}();
		$.fn.licoTemplate = function(opts) {
			opts = $.extend({}, licoTemplate.options, opts || {});
			return (function() {
				licoTemplate.parse.apply(licoTemplate, arguments);
			})(opts);;
		};

		$.fn.licoTemplate.getTemplate = function(template,data,opts) {
			//alert(template);
		};
		
		$.fn.licoTemplate.getTemplates = function(templates,data,opts) {
			//alert(templates);
		};

		$.licoTemplate = $.fn.licoTemplate;
	}
})(jQuery);
