Ext.define("com.atomunion.web.controller.SliderAndPush", {
	extend : "Ext.app.Controller",
	init : function() {
		this.menuLeft = document.getElementById('cbp-spmenu-left');
		this.menuRight = document.getElementById('cbp-spmenu-right');
		this.menuTop = document.getElementById('cbp-spmenu-top');
		this.menuBottom = document.getElementById('cbp-spmenu-bottom');
		this.main = document.body;// document.getElementById('main-container');

		var scope = this;
		$(this.menuLeft).find('.cbp-spmenu-remove').bind('click', function() {
			scope.sliderLeft(-1);
			if (classie.has(scope.main, 'cbp-spmenu-push-toright')) {
				$(scope.main).css('position', "static");
				classie.remove(scope.main, 'cbp-spmenu-push-toright')
			}
		});
		$(this.menuRight).find('.cbp-spmenu-remove').bind('click', function() {
			scope.sliderRight(-1);

			if (classie.has(scope.main, 'cbp-spmenu-push-toleft')) {
				$(scope.main).css('position', "static");
				classie.remove(this.main, 'cbp-spmenu-push-toleft')
			}
		});
		$(this.menuTop).find('.cbp-spmenu-remove').bind('click', function() {
			scope.sliderTop(-1);
		});
		$(this.menuBottom).find('.cbp-spmenu-remove').bind('click', function() {
			scope.sliderBottom(-1);
		});
	},
	append : function(dom, ele) {
		if (ele) {
			if (Object.prototype.toString.apply(ele) === "[object Array]") {
				$.each(ele, function(i, d) {
					$(dom).find('p').append(d)
				});
			} else {
				$(dom).find('p').append(ele)
			}
		}
	},
	sliderLeft : function(mode, dom) {
		$(this.menuLeft).find('p').empty()
		if (!mode) {
			if (!classie.has(this.menuLeft, 'cbp-spmenu-open')) {
				this.append(this.menuLeft, dom);
			}
			classie.toggle(this.menuLeft, 'cbp-spmenu-open');
		} else if (mode > 0) {
			this.append(this.menuLeft, dom);
			if (!classie.has(this.menuLeft, 'cbp-spmenu-open')) {
				classie.add(this.menuLeft, 'cbp-spmenu-open')
			}
		} else {
			if (classie.has(this.menuLeft, 'cbp-spmenu-open')) {
				classie.remove(this.menuLeft, 'cbp-spmenu-open')
			}
		}
	},
	sliderRight : function(mode, dom) {
		$(this.menuRight).find('p').empty()
		if (!mode) {
			if (!classie.has(this.menuRight, 'cbp-spmenu-open')) {

				this.append(this.menuRight, dom);
			}
			classie.toggle(this.menuRight, 'cbp-spmenu-open');
		} else if (mode > 0) {
			this.append(this.menuRight, dom);
			if (!classie.has(this.menuRight, 'cbp-spmenu-open')) {
				classie.add(this.menuRight, 'cbp-spmenu-open')
			}
		} else {
			if (classie.has(this.menuRight, 'cbp-spmenu-open')) {
				classie.remove(this.menuRight, 'cbp-spmenu-open')
			}
		}
	},
	sliderTop : function(mode, dom, params) {
		this.beforeSlider(this.menuTop, params);
		if (!mode) {
			if (classie.has(this.menuTop, 'cbp-spmenu-open')) {
				this.append(this.menuTop, dom);
				$(this.menuTop).css({
					top : "0px"
				});
			} else {
				$(this.menuTop).css({
					bottom : -$(this.menuTop).height() + "px"
				});
			}
			classie.toggle(this.menuTop, 'cbp-spmenu-open');
		} else if (mode > 0) {
			$(this.menuTop).css({
				top : "0px"
			});
			this.append(this.menuTop, dom);
			if (!classie.has(this.menuTop, 'cbp-spmenu-open')) {
				classie.add(this.menuTop, 'cbp-spmenu-open')
			}
		} else {
			$(this.menuBottom).css({
				top : -$(this.menuTop).height() + "px"
			});
			if (classie.has(this.menuTop, 'cbp-spmenu-open')) {
				classie.remove(this.menuTop, 'cbp-spmenu-open')
			}
		}
	},

	sliderBottom : function(mode, dom, params) {

		this.beforeSlider(this.menuBottom, params);
		if (!mode) {
			if (classie.has(this.menuBottom, 'cbp-spmenu-open')) {
				this.append(this.menuBottom, dom);
				$(this.menuBottom).css({
					bottom : "0px"
				});
			} else {
				$(this.menuBottom).css({
					bottom : -$(this.menuBottom).height() + "px"
				});
			}
			classie.toggle(this.menuBottom, 'cbp-spmenu-open');
		} else if (mode > 0) {
			$(this.menuBottom).css({
				bottom : "0px"
			});
			this.append(this.menuBottom, dom);
			if (!classie.has(this.menuBottom, 'cbp-spmenu-open')) {
				classie.add(this.menuBottom, 'cbp-spmenu-open');
			}
		} else {
			$(this.menuBottom).css({
				bottom : -$(this.menuBottom).height() + "px"
			});
			if (classie.has(this.menuBottom, 'cbp-spmenu-open')) {
				classie.remove(this.menuBottom, 'cbp-spmenu-open');
			}
		}
	},
	getBgcolor : function(l) {
		switch (l) {
		case 2:
			return [ "#db0000", "#ff0000" ]
		case 1:
		default:
			return [ "#0d77b6", "#47a3da" ];
		}
	},
	beforeSlider : function(menu, params) {
		$(menu).find('p').empty();
		!params && (params = {});
		if (params.bgcolor) {
			$(menu).css({
				background : params.bgcolor
			});
		} else {
			var colors = this.getBgcolor(params.level);
			$(menu).css({
				background : colors[1]
			});
			$(menu).find("h3").css({
				background : colors[0]
			});
		}
		$(menu).find("h3").html(params.title || '')
		if (params.height) {
			$(menu).css({
				height : params.height
			});
		}
	},
	pushLeft : function(mode, dom) {
		$(this.menuLeft).find('p').empty()
		if (!mode) {
			classie.toggle(this.menuLeft, 'cbp-spmenu-open');
			if (classie.has(this.main, 'cbp-spmenu-push-toright')) {
				$(this.main).css('position', "relative");
				this.append(this.menuLeft, dom);
			} else {
				$(this.main).css('position', "static");
			}
			classie.toggle(this.main, 'cbp-spmenu-push-toright');
		} else if (mode > 0) {
			this.append(this.menuLeft, dom);
			if (!classie.has(this.menuLeft, 'cbp-spmenu-open')) {
				classie.add(this.menuLeft, 'cbp-spmenu-open')
			}
			if (!classie.has(this.main, 'cbp-spmenu-push-toright')) {
				$(this.main).css('position', "relative");
				classie.add(this.main, 'cbp-spmenu-push-toright')
			}
		} else {
			if (classie.has(this.menuLeft, 'cbp-spmenu-open')) {
				classie.remove(this.menuLeft, 'cbp-spmenu-open')
			}
			if (classie.has(this.main, 'cbp-spmenu-push-toright')) {
				$(this.main).css('position', "static");
				classie.remove(this.main, 'cbp-spmenu-push-toright')
			}
		}
	},
	pushRight : function(mode, dom) {
		$(this.menuRight).find('p').empty()
		if (!mode) {
			classie.toggle(this.menuRight, 'cbp-spmenu-open');
			if (classie.has(this.main, 'cbp-spmenu-push-toleft')) {
				$(this.main).css('position', "relative");

				this.append(this.menuRight, dom);
			} else {
				$(this.main).css('position', "static");
			}
			classie.toggle(this.main, 'cbp-spmenu-push-toleft');
		} else if (mode > 0) {
			this.append(this.menuRight, dom);
			if (!classie.has(this.menuRight, 'cbp-spmenu-open')) {
				classie.add(this.menuRight, 'cbp-spmenu-open')
			}
			if (!classie.has(this.main, 'cbp-spmenu-push-toleft')) {
				$(this.main).css('position', "relative");
				classie.add(this.main, 'cbp-spmenu-push-toleft');
			}
		} else {
			if (classie.has(this.menuRight, 'cbp-spmenu-open')) {
				classie.remove(this.menuRight, 'cbp-spmenu-open')
			}
			if (classie.has(this.main, 'cbp-spmenu-push-toleft')) {
				$(this.main).css('position', "static");
				classie.remove(this.main, 'cbp-spmenu-push-toleft')
			}
		}
	}
});