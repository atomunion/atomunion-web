/*
 * qTip2 v2.2.0 tips modal viewport svg imagemap ie6 | qtip2.com | Licensed MIT,
 * GPL | Thu Nov 21 2013 20:34:59
 */
(function(t, e, i) {
	(function(t) {
		"use strict";
		"function" == typeof define && define.amd
				? define(["jquery"], t)
				: jQuery && !jQuery.fn.qtip && t(jQuery)
	})(function(s) {
		"use strict";
		function o(t, e, i, o) {
			this.id = i, this.target = t, this.tooltip = E, this.elements = {
				target : t
			}, this._id = X + "-" + i, this.timers = {
				img : {}
			}, this.options = e, this.plugins = {}, this.cache = {
				event : {},
				target : s(),
				disabled : k,
				attr : o,
				onTooltip : k,
				lastClass : ""
			}, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = k
		}
		function n(t) {
			return t === E || "object" !== s.type(t)
		}
		function r(t) {
			return !(s.isFunction(t) || t && t.attr || t.length || "object" === s
					.type(t)
					&& (t.jquery || t.then))
		}
		function a(t) {
			var e, i, o, a;
			return n(t)
					? k
					: (n(t.metadata) && (t.metadata = {
						type : t.metadata
					}), "content" in t
							&& (e = t.content, n(e) || e.jquery || e.done
									? e = t.content = {
										text : i = r(e) ? k : e
									}
									: i = e.text, "ajax" in e
									&& (o = e.ajax, a = o && o.once !== k, delete e.ajax, e.text = function(
											t, e) {
										var n = i
												|| s(this)
														.attr(e.options.content.attr)
												|| "Loading...", r = s.ajax(s
												.extend({}, o, {
															context : e
														})).then(o.success, E,
												o.error).then(function(t) {
											return t && a
													&& e.set("content.text", t), t
										}, function(t, i, s) {
											e.destroyed
													|| 0 === t.status
													|| e.set("content.text", i
																	+ ": " + s)
										});
										return a ? n : (e
												.set("content.text", n), r)
									}), "title" in e
									&& (n(e.title)
											|| (e.button = e.title.button, e.title = e.title.text), r(e.title
											|| k)
											&& (e.title = k))), "position" in t
							&& n(t.position) && (t.position = {
								my : t.position,
								at : t.position
							}), "show" in t && n(t.show)
							&& (t.show = t.show.jquery ? {
								target : t.show
							} : t.show === W ? {
								ready : W
							} : {
								event : t.show
							}), "hide" in t && n(t.hide)
							&& (t.hide = t.hide.jquery ? {
								target : t.hide
							} : {
								event : t.hide
							}), "style" in t && n(t.style) && (t.style = {
						classes : t.style
					}), s.each(R, function() {
								this.sanitize && this.sanitize(t)
							}), t)
		}
		function h(t, e) {
			for (var i, s = 0, o = t, n = e.split("."); o = o[n[s++]];)
				n.length > s && (i = o);
			return [i || t, n.pop()]
		}
		function l(t, e) {
			var i, s, o;
			for (i in this.checks)
				for (s in this.checks[i])
					(o = RegExp(s, "i").exec(t))
							&& (e.push(o), ("builtin" === i || this.plugins[i])
									&& this.checks[i][s].apply(this.plugins[i]
													|| this, e))
		}
		function c(t) {
			return G.concat("").join(t ? "-" + t + " " : " ")
		}
		function d(i) {
			return i && {
				type : i.type,
				pageX : i.pageX,
				pageY : i.pageY,
				target : i.target,
				relatedTarget : i.relatedTarget,
				scrollX : i.scrollX || t.pageXOffset || e.body.scrollLeft
						|| e.documentElement.scrollLeft,
				scrollY : i.scrollY || t.pageYOffset || e.body.scrollTop
						|| e.documentElement.scrollTop
			} || {}
		}
		function p(t, e) {
			return e > 0 ? setTimeout(s.proxy(t, this), e) : (t.call(this), i)
		}
		function u(t) {
			return this.tooltip.hasClass(ee)
					? k
					: (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = p
							.call(this, function() {
										this.toggle(W, t)
									}, this.options.show.delay), i)
		}
		function f(t) {
			if (this.tooltip.hasClass(ee))
				return k;
			var e = s(t.relatedTarget), i = e.closest(U)[0] === this.tooltip[0], o = e[0] === this.options.show.target[0];
			if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== e[0]
					&& "mouse" === this.options.position.target
					&& i
					|| this.options.hide.fixed
					&& /mouse(out|leave|move)/.test(t.type) && (i || o))
				try {
					t.preventDefault(), t.stopImmediatePropagation()
				} catch (n) {
				}
			else
				this.timers.hide = p.call(this, function() {
							this.toggle(k, t)
						}, this.options.hide.delay, this)
		}
		function g(t) {
			return this.tooltip.hasClass(ee) || !this.options.hide.inactive
					? k
					: (clearTimeout(this.timers.inactive), this.timers.inactive = p
							.call(this, function() {
										this.hide(t)
									}, this.options.hide.inactive), i)
		}
		function m(t) {
			this.rendered && this.tooltip[0].offsetWidth > 0
					&& this.reposition(t)
		}
		function v(t, i, o) {
			s(e.body).delegate(t, (i.split ? i : i.join(he + " ")) + he,
					function() {
						var t = T.api[s.attr(this, H)];
						t && !t.disabled && o.apply(t, arguments)
					})
		}
		function y(t, i, n) {
			var r, h, l, c, d, p = s(e.body), u = t[0] === e ? p : t, f = t.metadata
					? t.metadata(n.metadata)
					: E, g = "html5" === n.metadata.type && f
					? f[n.metadata.name]
					: E, m = t.data(n.metadata.name || "qtipopts");
			try {
				m = "string" == typeof m ? s.parseJSON(m) : m
			} catch (v) {
			}
			if (c = s.extend(W, {}, T.defaults, n, "object" == typeof m
							? a(m)
							: E, a(g || f)), h = c.position, c.id = i, "boolean" == typeof c.content.text) {
				if (l = t.attr(c.content.attr), c.content.attr === k || !l)
					return k;
				c.content.text = l
			}
			if (h.container.length || (h.container = p), h.target === k
					&& (h.target = u), c.show.target === k
					&& (c.show.target = u), c.show.solo === W
					&& (c.show.solo = h.container.closest("body")), c.hide.target === k
					&& (c.hide.target = u), c.position.viewport === W
					&& (c.position.viewport = h.container), h.container = h.container
					.eq(0), h.at = new z(h.at, W), h.my = new z(h.my), t
					.data(X))
				if (c.overwrite)
					t.qtip("destroy", !0);
				else if (c.overwrite === k)
					return k;
			return t.attr(Y, i), c.suppress && (d = t.attr("title"))
					&& t.removeAttr("title").attr(se, d).attr("title", ""), r = new o(
					t, c, i, !!l), t.data(X, r), t.one("remove.qtip-" + i
							+ " removeqtip.qtip-" + i, function() {
						var t;
						(t = s(this).data(X)) && t.destroy(!0)
					}), r
		}
		function b(t) {
			return t.charAt(0).toUpperCase() + t.slice(1)
		}
		function w(t, e) {
			var s, o, n = e.charAt(0).toUpperCase() + e.slice(1), r = (e + " "
					+ be.join(n + " ") + n).split(" "), a = 0;
			if (ye[e])
				return t.css(ye[e]);
			for (; s = r[a++];)
				if ((o = t.css(s)) !== i)
					return ye[e] = s, o
		}
		function _(t, e) {
			return Math.ceil(parseFloat(w(t, e)))
		}
		function x(t, e) {
			this._ns = "tip", this.options = e, this.offset = e.offset, this.size = [
					e.width, e.height], this.init(this.qtip = t)
		}
		function q(t, e) {
			this.options = e, this._ns = "-modal", this.init(this.qtip = t)
		}
		function C(t) {
			this._ns = "ie6", this.init(this.qtip = t)
		}
		var T, j, z, M, I, W = !0, k = !1, E = null, S = "x", L = "y", A = "width", B = "height", D = "top", F = "left", O = "bottom", P = "right", N = "center", $ = "flipinvert", V = "shift", R = {}, X = "qtip", Y = "data-hasqtip", H = "data-qtip-id", G = [
				"ui-widget", "ui-tooltip"], U = "." + X, Q = "click dblclick mousedown mouseup mousemove mouseleave mouseenter"
				.split(" "), J = X + "-fixed", K = X + "-default", Z = X
				+ "-focus", te = X + "-hover", ee = X + "-disabled", ie = "_replacedByqTip", se = "oldtitle", oe = {
			ie : function() {
				for (var t = 3, i = e.createElement("div"); (i.innerHTML = "<!--[if gt IE "
						+ ++t + "]><i></i><![endif]-->")
						&& i.getElementsByTagName("i")[0];);
				return t > 4 ? t : 0 / 0
			}(),
			iOS : parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i
					.exec(navigator.userAgent) || [0, ""])[1]).replace(
					"undefined", "3_2").replace("_", ".").replace("_", ""))
					|| k
		};
		j = o.prototype, j._when = function(t) {
			return s.when.apply(s, t)
		}, j.render = function(t) {
			if (this.rendered || this.destroyed)
				return this;
			var e, i = this, o = this.options, n = this.cache, r = this.elements, a = o.content.text, h = o.content.title, l = o.content.button, c = o.position, d = ("."
					+ this._id + " ", []);
			return s.attr(this.target[0], "aria-describedby", this._id), this.tooltip = r.tooltip = e = s(
					"<div/>", {
						id : this._id,
						"class" : [X, K, o.style.classes,
								X + "-pos-" + o.position.my.abbrev()].join(" "),
						width : o.style.width || "",
						height : o.style.height || "",
						tracking : "mouse" === c.target && c.adjust.mouse,
						role : "alert",
						"aria-live" : "polite",
						"aria-atomic" : k,
						"aria-describedby" : this._id + "-content",
						"aria-hidden" : W
					}).toggleClass(ee, this.disabled).attr(H, this.id).data(X,
					this).appendTo(c.container).append(r.content = s("<div />",
					{
						"class" : X + "-content",
						id : this._id + "-content",
						"aria-atomic" : W
					})), this.rendered = -1, this.positioning = W, h
					&& (this._createTitle(), s.isFunction(h)
							|| d.push(this._updateTitle(h, k))), l
					&& this._createButton(), s.isFunction(a)
					|| d.push(this._updateContent(a, k)), this.rendered = W, this
					._setWidget(), s.each(R, function(t) {
						var e;
						"render" === this.initialize && (e = this(i))
								&& (i.plugins[t] = e)
					}), this._unassignEvents(), this._assignEvents(), this
					._when(d).then(function() {
						i._trigger("render"), i.positioning = k, i.hiddenDuringWait
								|| !o.show.ready
								&& !t
								|| i.toggle(W, n.event, k), i.hiddenDuringWait = k
					}), T.api[this.id] = this, this
		}, j.destroy = function(t) {
			function e() {
				if (!this.destroyed) {
					this.destroyed = W;
					var t = this.target, e = t.attr(se);
					this.rendered
							&& this.tooltip.stop(1, 0).find("*").remove().end()
									.remove(), s.each(this.plugins, function() {
								this.destroy && this.destroy()
							}), clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this
							._unassignEvents(), t.removeData(X).removeAttr(H)
							.removeAttr(Y).removeAttr("aria-describedby"), this.options.suppress
							&& e && t.attr("title", e).removeAttr(se), this
							._unbind(t), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = E, delete T.api[this.id]
				}
			}
			return this.destroyed
					? this.target
					: (t === W && "hide" !== this.triggering || !this.rendered
							? e.call(this)
							: (this.tooltip.one("tooltiphidden", s.proxy(e,
											this)), !this.triggering
									&& this.hide()), this.target)
		}, M = j.checks = {
			builtin : {
				"^id$" : function(t, e, i, o) {
					var n = i === W ? T.nextid : i, r = X + "-" + n;
					n !== k && n.length > 0 && !s("#" + r).length
							? (this._id = r, this.rendered
									&& (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id
											+ "-content", this.elements.title[0].id = this._id
											+ "-title"))
							: t[e] = o
				},
				"^prerender" : function(t, e, i) {
					i && !this.rendered && this.render(this.options.show.ready)
				},
				"^content.text$" : function(t, e, i) {
					this._updateContent(i)
				},
				"^content.attr$" : function(t, e, i, s) {
					this.options.content.text === this.target.attr(s)
							&& this._updateContent(this.target.attr(i))
				},
				"^content.title$" : function(t, e, s) {
					return s
							? (s && !this.elements.title && this._createTitle(), this
									._updateTitle(s), i)
							: this._removeTitle()
				},
				"^content.button$" : function(t, e, i) {
					this._updateButton(i)
				},
				"^content.title.(text|button)$" : function(t, e, i) {
					this.set("content." + e, i)
				},
				"^position.(my|at)$" : function(t, e, i) {
					"string" == typeof i && (t[e] = new z(i, "at" === e))
				},
				"^position.container$" : function(t, e, i) {
					this.rendered && this.tooltip.appendTo(i)
				},
				"^show.ready$" : function(t, e, i) {
					i && (!this.rendered && this.render(W) || this.toggle(W))
				},
				"^style.classes$" : function(t, e, i, s) {
					this.rendered && this.tooltip.removeClass(s).addClass(i)
				},
				"^style.(width|height)" : function(t, e, i) {
					this.rendered && this.tooltip.css(e, i)
				},
				"^style.widget|content.title" : function() {
					this.rendered && this._setWidget()
				},
				"^style.def" : function(t, e, i) {
					this.rendered && this.tooltip.toggleClass(K, !!i)
				},
				"^events.(render|show|move|hide|focus|blur)$" : function(t, e,
						i) {
					this.rendered
							&& this.tooltip[(s.isFunction(i) ? "" : "un")
									+ "bind"]("tooltip" + e, i)
				},
				"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)" : function() {
					if (this.rendered) {
						var t = this.options.position;
						this.tooltip.attr("tracking", "mouse" === t.target
										&& t.adjust.mouse), this
								._unassignEvents(), this._assignEvents()
					}
				}
			}
		}, j.get = function(t) {
			if (this.destroyed)
				return this;
			var e = h(this.options, t.toLowerCase()), i = e[0][e[1]];
			return i.precedance ? i.string() : i
		};
		var ne = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i, re = /^prerender|show\.ready/i;
		j.set = function(t, e) {
			if (this.destroyed)
				return this;
			var o, n = this.rendered, r = k, c = this.options;
			return this.checks, "string" == typeof t
					? (o = t, t = {}, t[o] = e)
					: t = s.extend({}, t), s.each(t, function(e, o) {
						if (n && re.test(e))
							return delete t[e], i;
						var a, l = h(c, e.toLowerCase());
						a = l[0][l[1]], l[0][l[1]] = o && o.nodeType ? s(o) : o, r = ne
								.test(e)
								|| r, t[e] = [l[0], l[1], o, a]
					}), a(c), this.positioning = W, s.each(t, s.proxy(l, this)), this.positioning = k, this.rendered
					&& this.tooltip[0].offsetWidth > 0
					&& r
					&& this.reposition("mouse" === c.position.target
							? E
							: this.cache.event), this
		}, j._update = function(t, e) {
			var i = this, o = this.cache;
			return this.rendered && t
					? (s.isFunction(t)
							&& (t = t.call(this.elements.target, o.event, this)
									|| ""), s.isFunction(t.then)
							? (o.waiting = W, t.then(function(t) {
										return o.waiting = k, i._update(t, e)
									}, E, function(t) {
										return i._update(t, e)
									}))
							: t === k || !t && "" !== t ? k : (t.jquery
									&& t.length > 0 ? e.empty().append(t.css({
										display : "block",
										visibility : "visible"
									})) : e.html(t), this._waitForContent(e)
									.then(function(t) {
										t.images
												&& t.images.length
												&& i.rendered
												&& i.tooltip[0].offsetWidth > 0
												&& i.reposition(o.event,
														!t.length)
									})))
					: k
		}, j._waitForContent = function(t) {
			var e = this.cache;
			return e.waiting = W, (s.fn.imagesLoaded ? t.imagesLoaded() : s
					.Deferred().resolve([])).done(function() {
						e.waiting = k
					}).promise()
		}, j._updateContent = function(t, e) {
			this._update(t, this.elements.content, e)
		}, j._updateTitle = function(t, e) {
			this._update(t, this.elements.title, e) === k
					&& this._removeTitle(k)
		}, j._createTitle = function() {
			var t = this.elements, e = this._id + "-title";
			t.titlebar && this._removeTitle(), t.titlebar = s("<div />", {
				"class" : X + "-titlebar "
						+ (this.options.style.widget ? c("header") : "")
			}).append(t.title = s("<div />", {
						id : e,
						"class" : X + "-title",
						"aria-atomic" : W
					})).insertBefore(t.content).delegate(".qtip-close",
					"mousedown keydown mouseup keyup mouseout", function(t) {
						s(this).toggleClass("ui-state-active ui-state-focus",
								"down" === t.type.substr(-4))
					}).delegate(".qtip-close", "mouseover mouseout",
					function(t) {
						s(this).toggleClass("ui-state-hover",
								"mouseover" === t.type)
					}), this.options.content.button && this._createButton()
		}, j._removeTitle = function(t) {
			var e = this.elements;
			e.title
					&& (e.titlebar.remove(), e.titlebar = e.title = e.button = E, t !== k
							&& this.reposition())
		}, j.reposition = function(i, o) {
			if (!this.rendered || this.positioning || this.destroyed)
				return this;
			this.positioning = W;
			var n, r, a = this.cache, h = this.tooltip, l = this.options.position, c = l.target, d = l.my, p = l.at, u = l.viewport, f = l.container, g = l.adjust, m = g.method
					.split(" "), v = h.outerWidth(k), y = h.outerHeight(k), b = 0, w = 0, _ = h
					.css("position"), x = {
				left : 0,
				top : 0
			}, q = h[0].offsetWidth > 0, C = i && "scroll" === i.type, T = s(t), j = f[0].ownerDocument, z = this.mouse;
			if (s.isArray(c) && 2 === c.length)
				p = {
					x : F,
					y : D
				}, x = {
					left : c[0],
					top : c[1]
				};
			else if ("mouse" === c)
				p = {
					x : F,
					y : D
				}, !z || !z.pageX || !g.mouse && i && i.pageX
						? i
								&& i.pageX
								|| ((!g.mouse || this.options.show.distance)
										&& a.origin && a.origin.pageX
										? i = a.origin
										: (!i || i
												&& ("resize" === i.type || "scroll" === i.type))
												&& (i = a.event))
						: i = z, "static" !== _ && (x = f.offset()), j.body.offsetWidth !== (t.innerWidth || j.documentElement.clientWidth)
						&& (r = s(e.body).offset()), x = {
					left : i.pageX - x.left + (r && r.left || 0),
					top : i.pageY - x.top + (r && r.top || 0)
				}, g.mouse
						&& C
						&& z
						&& (x.left -= (z.scrollX || 0) - T.scrollLeft(), x.top -= (z.scrollY || 0)
								- T.scrollTop());
			else {
				if ("event" === c
						? i && i.target && "scroll" !== i.type
								&& "resize" !== i.type
								? a.target = s(i.target)
								: i.target || (a.target = this.elements.target)
						: "event" !== c
								&& (a.target = s(c.jquery
										? c
										: this.elements.target)), c = a.target, c = s(c)
						.eq(0), 0 === c.length)
					return this;
				c[0] === e || c[0] === t
						? (b = oe.iOS ? t.innerWidth : c.width(), w = oe.iOS
								? t.innerHeight
								: c.height(), c[0] === t && (x = {
							top : (u || c).scrollTop(),
							left : (u || c).scrollLeft()
						}))
						: R.imagemap && c.is("area")
								? n = R
										.imagemap(this, c, p, R.viewport
														? m
														: k)
								: R.svg && c && c[0].ownerSVGElement
										? n = R.svg(this, c, p, R.viewport
														? m
														: k)
										: (b = c.outerWidth(k), w = c
												.outerHeight(k), x = c.offset()), n
						&& (b = n.width, w = n.height, r = n.offset, x = n.position), x = this.reposition
						.offset(c, x, f), (oe.iOS > 3.1 && 4.1 > oe.iOS
						|| oe.iOS >= 4.3 && 4.33 > oe.iOS || !oe.iOS
						&& "fixed" === _)
						&& (x.left -= T.scrollLeft(), x.top -= T.scrollTop()), (!n || n
						&& n.adjustable !== k)
						&& (x.left += p.x === P ? b : p.x === N ? b / 2 : 0, x.top += p.y === O
								? w
								: p.y === N ? w / 2 : 0)
			}
			return x.left += g.x + (d.x === P ? -v : d.x === N ? -v / 2 : 0), x.top += g.y
					+ (d.y === O ? -y : d.y === N ? -y / 2 : 0), R.viewport
					? (x.adjusted = R.viewport(this, x, l, b, w, v, y), r
							&& x.adjusted.left && (x.left += r.left), r
							&& x.adjusted.top && (x.top += r.top))
					: x.adjusted = {
						left : 0,
						top : 0
					}, this._trigger("move", [x, u.elem || u], i)
					? (delete x.adjusted, o === k || !q || isNaN(x.left)
							|| isNaN(x.top) || "mouse" === c
							|| !s.isFunction(l.effect) ? h.css(x) : s
							.isFunction(l.effect)
							&& (l.effect.call(h, this, s.extend({}, x)), h
									.queue(function(t) {
										s(this).css({
													opacity : "",
													height : ""
												}), oe.ie
												&& this.style
														.removeAttribute("filter"), t()
									})), this.positioning = k, this)
					: this
		}, j.reposition.offset = function(t, i, o) {
			function n(t, e) {
				i.left += e * t.scrollLeft(), i.top += e * t.scrollTop()
			}
			if (!o[0])
				return i;
			var r, a, h, l, c = s(t[0].ownerDocument), d = !!oe.ie
					&& "CSS1Compat" !== e.compatMode, p = o[0];
			do
				"static" !== (a = s.css(p, "position"))
						&& ("fixed" === a
								? (h = p.getBoundingClientRect(), n(c, -1))
								: (h = s(p).position(), h.left += parseFloat(s
										.css(p, "borderLeftWidth"))
										|| 0, h.top += parseFloat(s.css(p,
										"borderTopWidth"))
										|| 0), i.left -= h.left
								+ (parseFloat(s.css(p, "marginLeft")) || 0), i.top -= h.top
								+ (parseFloat(s.css(p, "marginTop")) || 0), r
								|| "hidden" === (l = s.css(p, "overflow"))
								|| "visible" === l || (r = s(p)));
			while (p = p.offsetParent);
			return r && (r[0] !== c[0] || d) && n(r, 1), i
		};
		var ae = (z = j.reposition.Corner = function(t, e) {
			t = ("" + t).replace(/([A-Z])/, " $1").replace(/middle/gi, N)
					.toLowerCase(), this.x = (t.match(/left|right/i)
					|| t.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (t
					.match(/top|bottom|center/i) || ["inherit"])[0]
					.toLowerCase(), this.forceY = !!e;
			var i = t.charAt(0);
			this.precedance = "t" === i || "b" === i ? L : S
		}).prototype;
		ae.invert = function(t, e) {
			this[t] = this[t] === F ? P : this[t] === P ? F : e || this[t]
		}, ae.string = function() {
			var t = this.x, e = this.y;
			return t === e ? t : this.precedance === L || this.forceY
					&& "center" !== e ? e + " " + t : t + " " + e
		}, ae.abbrev = function() {
			var t = this.string().split(" ");
			return t[0].charAt(0) + (t[1] && t[1].charAt(0) || "")
		}, ae.clone = function() {
			return new z(this.string(), this.forceY)
		}, j.toggle = function(t, i) {
			var o = this.cache, n = this.options, r = this.tooltip;
			if (i) {
				if (/over|enter/.test(i.type)
						&& /out|leave/.test(o.event.type)
						&& n.show.target.add(i.target).length === n.show.target.length
						&& r.has(i.relatedTarget).length)
					return this;
				o.event = d(i)
			}
			if (this.waiting && !t && (this.hiddenDuringWait = W), !this.rendered)
				return t ? this.render(1) : this;
			if (this.destroyed || this.disabled)
				return this;
			var a, h, l, c = t ? "show" : "hide", p = this.options[c], u = (this.options[t
					? "hide"
					: "show"], this.options.position), f = this.options.content, g = this.tooltip
					.css("width"), m = this.tooltip.is(":visible"), v = t
					|| 1 === p.target.length, y = !i || 2 > p.target.length
					|| o.target[0] === i.target;
			return (typeof t).search("boolean|number") && (t = !m), a = !r
					.is(":animated")
					&& m === t && y, h = a ? E : !!this._trigger(c, [90]), this.destroyed
					? this
					: (h !== k && t && this.focus(i), !h || a
							? this
							: (s.attr(r[0], "aria-hidden", !t), t
									? (o.origin = d(this.mouse), s
											.isFunction(f.text)
											&& this._updateContent(f.text, k), s
											.isFunction(f.title)
											&& this._updateTitle(f.title, k), !I
											&& "mouse" === u.target
											&& u.adjust.mouse
											&& (s(e).bind("mousemove." + X,
													this._storeMouse), I = W), g
											|| r.css("width", r.outerWidth(k)), this
											.reposition(i, arguments[2]), g
											|| r.css("width", ""), p.solo
											&& ("string" == typeof p.solo
													? s(p.solo)
													: s(U, p.solo))
													.not(r)
													.not(p.target)
													.qtip(
															"hide",
															s
																	.Event("tooltipsolo")))
									: (clearTimeout(this.timers.show), delete o.origin, I
											&& !s(
													U
															+ '[tracking="true"]:visible',
													p.solo).not(r).length
											&& (s(e).unbind("mousemove." + X), I = k), this
											.blur(i)), l = s.proxy(function() {
								t
										? (oe.ie
												&& r[0].style
														.removeAttribute("filter"), r
												.css("overflow", ""), "string" == typeof p.autofocus
												&& s(
														this.options.show.autofocus,
														r).focus(), this.options.show.target
												.trigger("qtip-" + this.id
														+ "-inactive"))
										: r.css({
													display : "",
													visibility : "",
													opacity : "",
													left : "",
													top : ""
												}), this._trigger(t
										? "visible"
										: "hidden")
							}, this), p.effect === k || v === k
									? (r[c](), l())
									: s.isFunction(p.effect)
											? (r.stop(1, 1), p.effect.call(r,
													this), r.queue("fx",
													function(t) {
														l(), t()
													}))
											: r.fadeTo(90, t ? 1 : 0, l), t
									&& p.target.trigger("qtip-" + this.id
											+ "-inactive"), this))
		}, j.show = function(t) {
			return this.toggle(W, t)
		}, j.hide = function(t) {
			return this.toggle(k, t)
		}, j.focus = function(t) {
			if (!this.rendered || this.destroyed)
				return this;
			var e = s(U), i = this.tooltip, o = parseInt(i[0].style.zIndex, 10), n = T.zindex
					+ e.length;
			return i.hasClass(Z) || this._trigger("focus", [n], t)
					&& (o !== n && (e.each(function() {
								this.style.zIndex > o
										&& (this.style.zIndex = this.style.zIndex
												- 1)
							}), e.filter("." + Z).qtip("blur", t)), i
							.addClass(Z)[0].style.zIndex = n), this
		}, j.blur = function(t) {
			return !this.rendered || this.destroyed ? this : (this.tooltip
					.removeClass(Z), this._trigger("blur", [this.tooltip
							.css("zIndex")], t), this)
		}, j.disable = function(t) {
			return this.destroyed
					? this
					: ("toggle" === t
							? t = !(this.rendered
									? this.tooltip.hasClass(ee)
									: this.disabled)
							: "boolean" != typeof t && (t = W), this.rendered
							&& this.tooltip.toggleClass(ee, t).attr(
									"aria-disabled", t), this.disabled = !!t, this)
		}, j.enable = function() {
			return this.disable(k)
		}, j._createButton = function() {
			var t = this, e = this.elements, i = e.tooltip, o = this.options.content.button, n = "string" == typeof o, r = n
					? o
					: "Close tooltip";
			e.button && e.button.remove(), e.button = o.jquery ? o : s("<a />",
					{
						"class" : "qtip-close "
								+ (this.options.style.widget ? "" : X + "-icon"),
						title : r,
						"aria-label" : r
					}).prepend(s("<span />", {
						"class" : "ui-icon ui-icon-close",
						html : "&times;"
					})), e.button.appendTo(e.titlebar || i).attr("role",
					"button").click(function(e) {
						return i.hasClass(ee) || t.hide(e), k
					})
		}, j._updateButton = function(t) {
			if (!this.rendered)
				return k;
			var e = this.elements.button;
			t ? this._createButton() : e.remove()
		}, j._setWidget = function() {
			var t = this.options.style.widget, e = this.elements, i = e.tooltip, s = i
					.hasClass(ee);
			i.removeClass(ee), ee = t ? "ui-state-disabled" : "qtip-disabled", i
					.toggleClass(ee, s), i.toggleClass(
					"ui-helper-reset " + c(), t).toggleClass(K,
					this.options.style.def && !t), e.content
					&& e.content.toggleClass(c("content"), t), e.titlebar
					&& e.titlebar.toggleClass(c("header"), t), e.button
					&& e.button.toggleClass(X + "-icon", !t)
		}, j._storeMouse = function(t) {
			(this.mouse = d(t)).type = "mousemove"
		}, j._bind = function(t, e, i, o, n) {
			var r = "." + this._id + (o ? "-" + o : "");
			e.length
					&& s(t).bind((e.split ? e : e.join(r + " ")) + r,
							s.proxy(i, n || this))
		}, j._unbind = function(t, e) {
			s(t).unbind("." + this._id + (e ? "-" + e : ""))
		};
		var he = "." + X;
		s(function() {
			v(U, ["mouseenter", "mouseleave"], function(t) {
				var e = "mouseenter" === t.type, i = s(t.currentTarget), o = s(t.relatedTarget
						|| t.target), n = this.options;
				e
						? (this.focus(t), i.hasClass(J) && !i.hasClass(ee)
								&& clearTimeout(this.timers.hide))
						: "mouse" === n.position.target && n.hide.event
								&& n.show.target
								&& !o.closest(n.show.target[0]).length
								&& this.hide(t), i.toggleClass(te, e)
			}), v("[" + H + "]", Q, g)
		}), j._trigger = function(t, e, i) {
			var o = s.Event("tooltip" + t);
			return o.originalEvent = i && s.extend({}, i) || this.cache.event
					|| E, this.triggering = t, this.tooltip.trigger(o, [this]
							.concat(e || [])), this.triggering = k, !o
					.isDefaultPrevented()
		}, j._bindEvents = function(t, e, o, n, r, a) {
			if (n.add(o).length === n.length) {
				var h = [];
				e = s.map(e, function(e) {
							var o = s.inArray(e, t);
							return o > -1 ? (h.push(t.splice(o, 1)[0]), i) : e
						}), h.length && this._bind(o, h, function(t) {
							var e = this.rendered
									? this.tooltip[0].offsetWidth > 0
									: !1;
							(e ? a : r).call(this, t)
						})
			}
			this._bind(o, t, r), this._bind(n, e, a)
		}, j._assignInitialEvents = function(t) {
			function e(t) {
				return this.disabled || this.destroyed
						? k
						: (this.cache.event = d(t), this.cache.target = t
								? s(t.target)
								: [i], clearTimeout(this.timers.show), this.timers.show = p
								.call(this, function() {
											this.render("object" == typeof t
													|| o.show.ready)
										}, o.show.delay), i)
			}
			var o = this.options, n = o.show.target, r = o.hide.target, a = o.show.event
					? s.trim("" + o.show.event).split(" ")
					: [], h = o.hide.event ? s.trim("" + o.hide.event)
					.split(" ") : [];
			/mouse(over|enter)/i.test(o.show.event)
					&& !/mouse(out|leave)/i.test(o.hide.event)
					&& h.push("mouseleave"), this._bind(n, "mousemove",
					function(t) {
						this._storeMouse(t), this.cache.onTarget = W
					}), this._bindEvents(a, h, n, r, e, function() {
						clearTimeout(this.timers.show)
					}), (o.show.ready || o.prerender) && e.call(this, t)
		}, j._assignEvents = function() {
			var i = this, o = this.options, n = o.position, r = this.tooltip, a = o.show.target, h = o.hide.target, l = n.container, c = n.viewport, d = s(e), p = (s(e.body), s(t)), v = o.show.event
					? s.trim("" + o.show.event).split(" ")
					: [], y = o.hide.event ? s.trim("" + o.hide.event)
					.split(" ") : [];
			s.each(o.events, function(t, e) {
						i._bind(r, "toggle" === t ? ["tooltipshow",
										"tooltiphide"] : ["tooltip" + t], e,
								null, r)
					}), /mouse(out|leave)/i.test(o.hide.event)
					&& "window" === o.hide.leave
					&& this._bind(d, ["mouseout", "blur"], function(t) {
								/select|option/.test(t.target.nodeName)
										|| t.relatedTarget || this.hide(t)
							}), o.hide.fixed
					? h = h.add(r.addClass(J))
					: /mouse(over|enter)/i.test(o.show.event)
							&& this._bind(h, "mouseleave", function() {
										clearTimeout(this.timers.show)
									}), ("" + o.hide.event).indexOf("unfocus") > -1
					&& this._bind(l.closest("html"),
							["mousedown", "touchstart"], function(t) {
								var e = s(t.target), i = this.rendered
										&& !this.tooltip.hasClass(ee)
										&& this.tooltip[0].offsetWidth > 0, o = e
										.parents(U).filter(this.tooltip[0]).length > 0;
								e[0] === this.target[0]
										|| e[0] === this.tooltip[0] || o
										|| this.target.has(e[0]).length || !i
										|| this.hide(t)
							}), "number" == typeof o.hide.inactive
					&& (this._bind(a, "qtip-" + this.id + "-inactive", g), this
							._bind(h.add(r), T.inactiveEvents, g, "-inactive")), this
					._bindEvents(v, y, a, h, u, f), this._bind(a.add(r),
					"mousemove", function(t) {
						if ("number" == typeof o.hide.distance) {
							var e = this.cache.origin || {}, i = this.options.hide.distance, s = Math.abs;
							(s(t.pageX - e.pageX) >= i || s(t.pageY - e.pageY) >= i)
									&& this.hide(t)
						}
						this._storeMouse(t)
					}), "mouse" === n.target
					&& n.adjust.mouse
					&& (o.hide.event
							&& this._bind(a, ["mouseenter", "mouseleave"],
									function(t) {
										this.cache.onTarget = "mouseenter" === t.type
									}), this._bind(d, "mousemove", function(t) {
								this.rendered && this.cache.onTarget
										&& !this.tooltip.hasClass(ee)
										&& this.tooltip[0].offsetWidth > 0
										&& this.reposition(t)
							})), (n.adjust.resize || c.length)
					&& this._bind(s.event.special.resize ? c : p, "resize", m), n.adjust.scroll
					&& this._bind(p.add(n.container), "scroll", m)
		}, j._unassignEvents = function() {
			var i = [this.options.show.target[0], this.options.hide.target[0],
					this.rendered && this.tooltip[0],
					this.options.position.container[0],
					this.options.position.viewport[0],
					this.options.position.container.closest("html")[0], t, e];
			this._unbind(s([]).pushStack(s.grep(i, function(t) {
						return "object" == typeof t
					})))
		}, T = s.fn.qtip = function(t, e, o) {
			var n = ("" + t).toLowerCase(), r = E, h = s.makeArray(arguments)
					.slice(1), l = h[h.length - 1], c = this[0] ? s.data(
					this[0], X) : E;
			return !arguments.length && c || "api" === n
					? c
					: "string" == typeof t ? (this.each(function() {
								var t = s.data(this, X);
								if (!t)
									return W;
								if (l && l.timeStamp && (t.cache.event = l), !e
										|| "option" !== n && "options" !== n)
									t[n] && t[n].apply(t, h);
								else {
									if (o === i && !s.isPlainObject(e))
										return r = t.get(e), k;
									t.set(e, o)
								}
							}), r !== E ? r : this) : "object" != typeof t
							&& arguments.length
							? i
							: (c = a(s.extend(W, {}, t)), this.each(
									function(t) {
										var e, o;
										return o = s.isArray(c.id)
												? c.id[t]
												: c.id, o = !o || o === k
												|| 1 > o.length || T.api[o]
												? T.nextid++
												: o, e = y(s(this), o, c), e === k
												? W
												: (T.api[o] = e, s.each(R,
														function() {
															"initialize" === this.initialize
																	&& this(e)
														}), e
														._assignInitialEvents(l), i)
									}))
		}, s.qtip = o, T.api = {}, s.each({
					attr : function(t, e) {
						if (this.length) {
							var i = this[0], o = "title", n = s.data(i, "qtip");
							if (t === o && n && "object" == typeof n
									&& n.options.suppress)
								return 2 > arguments.length
										? s.attr(i, se)
										: (n && n.options.content.attr === o
												&& n.cache.attr
												&& n.set("content.text", e), this
												.attr(se, e))
						}
						return s.fn["attr" + ie].apply(this, arguments)
					},
					clone : function(t) {
						var e = (s([]), s.fn["clone" + ie].apply(this,
								arguments));
						return t
								|| e.filter("[" + se + "]").attr("title",
										function() {
											return s.attr(this, se)
										}).removeAttr(se), e
					}
				}, function(t, e) {
					if (!e || s.fn[t + ie])
						return W;
					var i = s.fn[t + ie] = s.fn[t];
					s.fn[t] = function() {
						return e.apply(this, arguments)
								|| i.apply(this, arguments)
					}
				}), s.ui
				|| (s["cleanData" + ie] = s.cleanData, s.cleanData = function(t) {
					for (var e, i = 0; (e = s(t[i])).length; i++)
						if (e.attr(Y))
							try {
								e.triggerHandler("removeqtip")
							} catch (o) {
							}
					s["cleanData" + ie].apply(this, arguments)
				}), T.version = "2.2.0", T.nextid = 0, T.inactiveEvents = Q, T.zindex = 15e3, T.defaults = {
			prerender : k,
			id : k,
			overwrite : W,
			suppress : W,
			content : {
				text : W,
				attr : "title",
				title : k,
				button : k
			},
			position : {
				my : "top left",
				at : "bottom right",
				target : k,
				container : k,
				viewport : k,
				adjust : {
					x : 0,
					y : 0,
					mouse : W,
					scroll : W,
					resize : W,
					method : "flipinvert flipinvert"
				},
				effect : function(t, e) {
					s(this).animate(e, {
								duration : 200,
								queue : k
							})
				}
			},
			show : {
				target : k,
				event : "mouseenter",
				effect : W,
				delay : 90,
				solo : k,
				ready : k,
				autofocus : k
			},
			hide : {
				target : k,
				event : "mouseleave",
				effect : W,
				delay : 0,
				fixed : k,
				inactive : k,
				leave : "window",
				distance : k
			},
			style : {
				classes : "",
				widget : k,
				width : k,
				height : k,
				def : W
			},
			events : {
				render : E,
				move : E,
				show : E,
				hide : E,
				toggle : E,
				visible : E,
				hidden : E,
				focus : E,
				blur : E
			}
		};
		var le, ce = "margin", de = "border", pe = "color", ue = "background-color", fe = "transparent", ge = " !important", me = !!e
				.createElement("canvas").getContext, ve = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i, ye = {}, be = [
				"Webkit", "O", "Moz", "ms"];
		if (me)
			var we = t.devicePixelRatio || 1, _e = function() {
				var t = e.createElement("canvas").getContext("2d");
				return t.backingStorePixelRatio
						|| t.webkitBackingStorePixelRatio
						|| t.mozBackingStorePixelRatio
						|| t.msBackingStorePixelRatio
						|| t.oBackingStorePixelRatio || 1
			}(), xe = we / _e;
		else
			var qe = function(t, e, i) {
				return "<qtipvml:"
						+ t
						+ ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '
						+ (e || "") + ' style="behavior: url(#default#VML); '
						+ (i || "") + '" />'
			};
		s.extend(x.prototype, {
			init : function(t) {
				var e, i;
				i = this.element = t.elements.tip = s("<div />", {
							"class" : X + "-tip"
						}).prependTo(t.tooltip), me
						? (e = s("<canvas />").appendTo(this.element)[0]
								.getContext("2d"), e.lineJoin = "miter", e.miterLimit = 1e5, e
								.save())
						: (e = qe("shape", 'coordorigin="0,0"',
								"position:absolute;"), this.element.html(e + e), t
								._bind(s("*", i).add(i),
										["click", "mousedown"], function(t) {
											t.stopPropagation()
										}, this._ns)), t._bind(t.tooltip,
						"tooltipmove", this.reposition, this._ns, this), this
						.create()
			},
			_swapDimensions : function() {
				this.size[0] = this.options.height, this.size[1] = this.options.width
			},
			_resetDimensions : function() {
				this.size[0] = this.options.width, this.size[1] = this.options.height
			},
			_useTitle : function(t) {
				var e = this.qtip.elements.titlebar;
				return e
						&& (t.y === D || t.y === N
								&& this.element.position().top + this.size[1]
										/ 2 + this.options.offset < e
										.outerHeight(W))
			},
			_parseCorner : function(t) {
				var e = this.qtip.options.position.my;
				return t === k || e === k ? t = k : t === W ? t = new z(e
						.string()) : t.string || (t = new z(t), t.fixed = W), t
			},
			_parseWidth : function(t, e, i) {
				var s = this.qtip.elements, o = de + b(e) + "Width";
				return (i ? _(i, o) : _(s.content, o)
						|| _(this._useTitle(t) && s.titlebar || s.content, o)
						|| _(s.tooltip, o))
						|| 0
			},
			_parseRadius : function(t) {
				var e = this.qtip.elements, i = de + b(t.y) + b(t.x) + "Radius";
				return 9 > oe.ie ? 0 : _(this._useTitle(t) && e.titlebar
								|| e.content, i)
						|| _(e.tooltip, i) || 0
			},
			_invalidColour : function(t, e, i) {
				var s = t.css(e);
				return !s || i && s === t.css(i) || ve.test(s) ? k : s
			},
			_parseColours : function(t) {
				var e = this.qtip.elements, i = this.element.css("cssText", ""), o = de
						+ b(t[t.precedance]) + b(pe), n = this._useTitle(t)
						&& e.titlebar || e.content, r = this._invalidColour, a = [];
				return a[0] = r(i, ue) || r(n, ue) || r(e.content, ue)
						|| r(e.tooltip, ue) || i.css(ue), a[1] = r(i, o, pe)
						|| r(n, o, pe) || r(e.content, o, pe)
						|| r(e.tooltip, o, pe) || e.tooltip.css(o), s("*", i)
						.add(i)
						.css("cssText",
								ue + ":" + fe + ge + ";" + de + ":0" + ge + ";"), a
			},
			_calculateSize : function(t) {
				var e, i, s, o = t.precedance === L, n = this.options.width, r = this.options.height, a = "c" === t
						.abbrev(), h = (o ? n : r) * (a ? .5 : 1), l = Math.pow, c = Math.round, d = Math
						.sqrt(l(h, 2) + l(r, 2)), p = [this.border / h * d,
						this.border / r * d];
				return p[2] = Math.sqrt(l(p[0], 2) - l(this.border, 2)), p[3] = Math
						.sqrt(l(p[1], 2) - l(this.border, 2)), e = d + p[2]
						+ p[3] + (a ? 0 : p[0]), i = e / d, s = [c(i * n),
						c(i * r)], o ? s : s.reverse()
			},
			_calculateTip : function(t, e, i) {
				i = i || 1, e = e || this.size;
				var s = e[0] * i, o = e[1] * i, n = Math.ceil(s / 2), r = Math
						.ceil(o / 2), a = {
					br : [0, 0, s, o, s, 0],
					bl : [0, 0, s, 0, 0, o],
					tr : [0, o, s, 0, s, o],
					tl : [0, 0, 0, o, s, o],
					tc : [0, o, n, 0, s, o],
					bc : [0, 0, s, 0, n, o],
					rc : [0, 0, s, r, 0, o],
					lc : [s, 0, s, o, 0, r]
				};
				return a.lt = a.br, a.rt = a.bl, a.lb = a.tr, a.rb = a.tl, a[t
						.abbrev()]
			},
			_drawCoords : function(t, e) {
				t.beginPath(), t.moveTo(e[0], e[1]), t.lineTo(e[2], e[3]), t
						.lineTo(e[4], e[5]), t.closePath()
			},
			create : function() {
				var t = this.corner = (me || oe.ie)
						&& this._parseCorner(this.options.corner);
				return (this.enabled = !!this.corner
						&& "c" !== this.corner.abbrev())
						&& (this.qtip.cache.corner = t.clone(), this.update()), this.element
						.toggle(this.enabled), this.corner
			},
			update : function(e, i) {
				if (!this.enabled)
					return this;
				var o, n, r, a, h, l, c, d, p = this.qtip.elements, u = this.element, f = u
						.children(), g = this.options, m = this.size, v = g.mimic, y = Math.round;
				e || (e = this.qtip.cache.corner || this.corner), v === k
						? v = e
						: (v = new z(v), v.precedance = e.precedance, "inherit" === v.x
								? v.x = e.x
								: "inherit" === v.y ? v.y = e.y : v.x === v.y
										&& (v[e.precedance] = e[e.precedance])), n = v.precedance, e.precedance === S
						? this._swapDimensions()
						: this._resetDimensions(), o = this.color = this
						._parseColours(e), o[1] !== fe
						? (d = this.border = this._parseWidth(e,
								e[e.precedance]), g.border && 1 > d
								&& !ve.test(o[1]) && (o[0] = o[1]), this.border = d = g.border !== W
								? g.border
								: d)
						: this.border = d = 0, c = this.size = this
						._calculateSize(e), u.css({
							width : c[0],
							height : c[1],
							lineHeight : c[1] + "px"
						}), l = e.precedance === L ? [
						y(v.x === F ? d : v.x === P
								? c[0] - m[0] - d
								: (c[0] - m[0]) / 2),
						y(v.y === D ? c[1] - m[1] : 0)] : [
						y(v.x === F ? c[0] - m[0] : 0),
						y(v.y === D ? d : v.y === O
								? c[1] - m[1] - d
								: (c[1] - m[1]) / 2)], me
						? (r = f[0].getContext("2d"), r.restore(), r.save(), r
								.clearRect(0, 0, 6e3, 6e3), a = this
								._calculateTip(v, m, xe), h = this
								._calculateTip(v, this.size, xe), f.attr(A,
								c[0] * xe).attr(B, c[1] * xe), f.css(A, c[0])
								.css(B, c[1]), this._drawCoords(r, h), r.fillStyle = o[1], r
								.fill(), r.translate(l[0] * xe, l[1] * xe), this
								._drawCoords(r, a), r.fillStyle = o[0], r
								.fill())
						: (a = this._calculateTip(v), a = "m" + a[0] + ","
								+ a[1] + " l" + a[2] + "," + a[3] + " " + a[4]
								+ "," + a[5] + " xe", l[2] = d
								&& /^(r|b)/i.test(e.string()) ? 8 === oe.ie
								? 2
								: 1 : 0, f.css({
									coordsize : c[0] + d + " " + (c[1] + d),
									antialias : ""
											+ (v.string().indexOf(N) > -1),
									left : l[0] - l[2] * Number(n === S),
									top : l[1] - l[2] * Number(n === L),
									width : c[0] + d,
									height : c[1] + d
								}).each(function(t) {
							var e = s(this);
							e[e.prop ? "prop" : "attr"]({
										coordsize : c[0] + d + " " + (c[1] + d),
										path : a,
										fillcolor : o[0],
										filled : !!t,
										stroked : !t
									}).toggle(!(!d && !t)), !t
									&& e
											.html(qe(
													"stroke",
													'weight="'
															+ 2
															* d
															+ 'px" color="'
															+ o[1]
															+ '" miterlimit="1000" joinstyle="miter"'))
						})), t.opera && setTimeout(function() {
							p.tip.css({
										display : "inline-block",
										visibility : "visible"
									})
						}, 1), i !== k && this.calculate(e, c)
			},
			calculate : function(t, e) {
				if (!this.enabled)
					return k;
				var i, o, n = this, r = this.qtip.elements, a = this.element, h = this.options.offset, l = (r.tooltip
						.hasClass("ui-widget"), {});
				return t = t || this.corner, i = t.precedance, e = e
						|| this._calculateSize(t), o = [t.x, t.y], i === S
						&& o.reverse(), s.each(o, function(s, o) {
							var a, c, d;
							o === N
									? (a = i === L ? F : D, l[a] = "50%", l[ce
											+ "-" + a] = -Math.round(e[i === L
											? 0
											: 1]
											/ 2)
											+ h)
									: (a = n._parseWidth(t, o, r.tooltip), c = n
											._parseWidth(t, o, r.content), d = n
											._parseRadius(t), l[o] = Math.max(
											-n.border, s ? c : h
													+ (d > a ? d : -a)))
						}), l[t[i]] -= e[i === S ? 0 : 1], a.css({
							margin : "",
							top : "",
							bottom : "",
							left : "",
							right : ""
						}).css(l), l
			},
			reposition : function(t, e, s) {
				function o(t, e, i, s, o) {
					t === V && l.precedance === e && c[s] && l[i] !== N
							? l.precedance = l.precedance === S ? L : S
							: t !== V
									&& c[s]
									&& (l[e] = l[e] === N
											? c[s] > 0 ? s : o
											: l[e] === s ? o : s)
				}
				function n(t, e, o) {
					l[t] === N
							? g[ce + "-" + e] = f[t] = r[ce + "-" + e] - c[e]
							: (a = r[o] !== i ? [c[e], -r[e]] : [-c[e], r[e]], (f[t] = Math
									.max(a[0], a[1])) > a[0]
									&& (s[e] -= c[e], f[e] = k), g[r[o] !== i
									? o
									: e] = f[t])
				}
				if (this.enabled) {
					var r, a, h = e.cache, l = this.corner.clone(), c = s.adjusted, d = e.options.position.adjust.method
							.split(" "), p = d[0], u = d[1] || d[0], f = {
						left : k,
						top : k,
						x : 0,
						y : 0
					}, g = {};
					this.corner.fixed !== W
							&& (o(p, S, L, F, P), o(u, L, S, D, O), l.string() === h.corner
									.string()
									|| h.cornerTop === c.top
									&& h.cornerLeft === c.left
									|| this.update(l, k)), r = this
							.calculate(l), r.right !== i && (r.left = -r.right), r.bottom !== i
							&& (r.top = -r.bottom), r.user = this.offset, (f.left = p === V
							&& !!c.left)
							&& n(S, F, P), (f.top = u === V && !!c.top)
							&& n(L, D, O), this.element.css(g).toggle(!(f.x
							&& f.y || l.x === N && f.y || l.y === N && f.x)), s.left -= r.left.charAt
							? r.user
							: p !== V || f.top || !f.left && !f.top ? r.left
									+ this.border : 0, s.top -= r.top.charAt
							? r.user
							: u !== V || f.left || !f.left && !f.top ? r.top
									+ this.border : 0, h.cornerLeft = c.left, h.cornerTop = c.top, h.corner = l
							.clone()
				}
			},
			destroy : function() {
				this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip
						&& this.qtip.elements.tip.find("*").remove().end()
								.remove()
			}
		}), le = R.tip = function(t) {
			return new x(t, t.options.style.tip)
		}, le.initialize = "render", le.sanitize = function(t) {
			if (t.style && "tip" in t.style) {
				var e = t.style.tip;
				"object" != typeof e && (e = t.style.tip = {
					corner : e
				}), /string|boolean/i.test(typeof e.corner) || (e.corner = W)
			}
		}, M.tip = {
			"^position.my|style.tip.(corner|mimic|border)$" : function() {
				this.create(), this.qtip.reposition()
			},
			"^style.tip.(height|width)$" : function(t) {
				this.size = [t.width, t.height], this.update(), this.qtip
						.reposition()
			},
			"^content.title|style.(classes|widget)$" : function() {
				this.update()
			}
		}, s.extend(W, T.defaults, {
					style : {
						tip : {
							corner : W,
							mimic : k,
							width : 6,
							height : 6,
							border : W,
							offset : 0
						}
					}
				});
		var Ce, Te, je = "qtip-modal", ze = "." + je;
		Te = function() {
			function t(t) {
				if (s.expr[":"].focusable)
					return s.expr[":"].focusable;
				var e, i, o, n = !isNaN(s.attr(t, "tabindex")), r = t.nodeName
						&& t.nodeName.toLowerCase();
				return "area" === r ? (e = t.parentNode, i = e.name, t.href
						&& i && "map" === e.nodeName.toLowerCase()
						? (o = s("img[usemap=#" + i + "]")[0], !!o
								&& o.is(":visible"))
						: !1) : /input|select|textarea|button|object/.test(r)
						? !t.disabled
						: "a" === r ? t.href || n : n
			}
			function i(t) {
				1 > c.length && t.length ? t.not("body").blur() : c.first()
						.focus()
			}
			function o(t) {
				if (h.is(":visible")) {
					var e, o = s(t.target), a = n.tooltip, l = o.closest(U);
					e = 1 > l.length
							? k
							: parseInt(l[0].style.zIndex, 10) > parseInt(
									a[0].style.zIndex, 10), e
							|| o.closest(U)[0] === a[0] || i(o), r = t.target === c[c.length
							- 1]
				}
			}
			var n, r, a, h, l = this, c = {};
			s.extend(l, {
				init : function() {
					return h = l.elem = s("<div />", {
								id : "qtip-overlay",
								html : "<div></div>",
								mousedown : function() {
									return k
								}
							}).hide(), s(e.body).bind("focusin" + ze, o), s(e)
							.bind("keydown" + ze, function(t) {
								n && n.options.show.modal.escape
										&& 27 === t.keyCode && n.hide(t)
							}), h.bind("click" + ze, function(t) {
								n && n.options.show.modal.blur && n.hide(t)
							}), l
				},
				update : function(e) {
					n = e, c = e.options.show.modal.stealfocus !== k
							? e.tooltip.find("*").filter(function() {
										return t(this)
									})
							: []
				},
				toggle : function(t, o, r) {
					var c = (s(e.body), t.tooltip), d = t.options.show.modal, p = d.effect, u = o
							? "show"
							: "hide", f = h.is(":visible"), g = s(ze)
							.filter(":visible:not(:animated)").not(c);
					return l.update(t), o && d.stealfocus !== k
							&& i(s(":focus")), h.toggleClass("blurs", d.blur), o
							&& h.appendTo(e.body), h.is(":animated") && f === o
							&& a !== k || !o && g.length ? l : (h.stop(W, k), s
							.isFunction(p) ? p.call(h, o) : p === k
							? h[u]()
							: h.fadeTo(parseInt(r, 10) || 90, o ? 1 : 0,
									function() {
										o || h.hide()
									}), o || h.queue(function(t) {
								h.css({
											left : "",
											top : ""
										}), s(ze).length || h.detach(), t()
							}), a = o, n.destroyed && (n = E), l)
				}
			}), l.init()
		}, Te = new Te, s.extend(q.prototype, {
			init : function(t) {
				var e = t.tooltip;
				return this.options.on ? (t.elements.overlay = Te.elem, e
						.addClass(je).css("z-index",
								T.modal_zindex + s(ze).length), t._bind(e, [
								"tooltipshow", "tooltiphide"],
						function(t, i, o) {
							var n = t.originalEvent;
							if (t.target === e[0])
								if (n
										&& "tooltiphide" === t.type
										&& /mouse(leave|enter)/.test(n.type)
										&& s(n.relatedTarget)
												.closest(Te.elem[0]).length)
									try {
										t.preventDefault()
									} catch (r) {
									}
								else
									(!n || n && "tooltipsolo" !== n.type)
											&& this
													.toggle(
															t,
															"tooltipshow" === t.type,
															o)
						}, this._ns, this), t._bind(e, "tooltipfocus",
						function(t, i) {
							if (!t.isDefaultPrevented() && t.target === e[0]) {
								var o = s(ze), n = T.modal_zindex + o.length, r = parseInt(
										e[0].style.zIndex, 10);
								Te.elem[0].style.zIndex = n - 1, o.each(
										function() {
											this.style.zIndex > r
													&& (this.style.zIndex -= 1)
										}), o.filter("." + Z).qtip("blur",
										t.originalEvent), e.addClass(Z)[0].style.zIndex = n, Te
										.update(i);
								try {
									t.preventDefault()
								} catch (a) {
								}
							}
						}, this._ns, this), t._bind(e, "tooltiphide", function(
								t) {
							t.target === e[0]
									&& s(ze).filter(":visible").not(e).last()
											.qtip("focus", t)
						}, this._ns, this), i)
						: this
			},
			toggle : function(t, e, s) {
				return t && t.isDefaultPrevented() ? this : (Te.toggle(
						this.qtip, !!e, s), i)
			},
			destroy : function() {
				this.qtip.tooltip.removeClass(je), this.qtip._unbind(
						this.qtip.tooltip, this._ns), Te.toggle(this.qtip, k), delete this.qtip.elements.overlay
			}
		}), Ce = R.modal = function(t) {
			return new q(t, t.options.show.modal)
		}, Ce.sanitize = function(t) {
			t.show && ("object" != typeof t.show.modal ? t.show.modal = {
				on : !!t.show.modal
			} : t.show.modal.on === i && (t.show.modal.on = W))
		}, T.modal_zindex = T.zindex - 200, Ce.initialize = "render", M.modal = {
			"^show.modal.(on|blur)$" : function() {
				this.destroy(), this.init(), this.qtip.elems.overlay
						.toggle(this.qtip.tooltip[0].offsetWidth > 0)
			}
		}, s.extend(W, T.defaults, {
					show : {
						modal : {
							on : k,
							effect : W,
							blur : W,
							stealfocus : W,
							escape : W
						}
					}
				}), R.viewport = function(i, s, o, n, r, a, h) {
			function l(t, e, i, o, n, r, a, h, l) {
				var c = s[n], p = _[t], b = x[t], w = i === V, q = p === n
						? l
						: p === r ? -l : -l / 2, C = b === n ? h : b === r
						? -h
						: -h / 2, T = v[n] + y[n] - (f ? 0 : u[n]), j = T - c, z = c
						+ l - (a === A ? g : m) - T, M = q
						- (_.precedance === t || p === _[e] ? C : 0)
						- (b === N ? h / 2 : 0);
				return w
						? (M = (p === n ? 1 : -1) * q, s[n] += j > 0
								? j
								: z > 0 ? -z : 0, s[n] = Math.max(-u[n] + y[n],
								c - M, Math.min(Math.max(-u[n] + y[n]
														+ (a === A ? g : m), c
														+ M), s[n],
										"center" === p ? c - q : 1e9)))
						: (o *= i === $ ? 2 : 0, j > 0 && (p !== n || z > 0)
								? (s[n] -= M + o, d.invert(t, n))
								: z > 0
										&& (p !== r || j > 0)
										&& (s[n] -= (p === N ? -M : M) + o, d
												.invert(t, r)), v > s[n]
								&& -s[n] > z && (s[n] = c, d = _.clone())), s[n]
						- c
			}
			var c, d, p, u, f, g, m, v, y, b = o.target, w = i.elements.tooltip, _ = o.my, x = o.at, q = o.adjust, C = q.method
					.split(" "), T = C[0], j = C[1] || C[0], z = o.viewport, M = o.container, I = i.cache, W = {
				left : 0,
				top : 0
			};
			return z.jquery && b[0] !== t && b[0] !== e.body
					&& "none" !== q.method
					? (u = M.offset() || W, f = "static" === M.css("position"), c = "fixed" === w
							.css("position"), g = z[0] === t ? z.width() : z
							.outerWidth(k), m = z[0] === t ? z.height() : z
							.outerHeight(k), v = {
						left : c ? 0 : z.scrollLeft(),
						top : c ? 0 : z.scrollTop()
					}, y = z.offset() || W, ("shift" !== T || "shift" !== j)
							&& (d = _.clone()), W = {
						left : "none" !== T
								? l(S, L, T, q.x, F, P, A, n, a)
								: 0,
						top : "none" !== j ? l(L, S, j, q.y, D, O, B, r, h) : 0
					}, d
							&& I.lastClass !== (p = X + "-pos-" + d.abbrev())
							&& w.removeClass(i.cache.lastClass)
									.addClass(i.cache.lastClass = p), W)
					: W
		}, R.polys = {
			polygon : function(t, e) {
				var i, s, o, n = {
					width : 0,
					height : 0,
					position : {
						top : 1e10,
						right : 0,
						bottom : 0,
						left : 1e10
					},
					adjustable : k
				}, r = 0, a = [], h = 1, l = 1, c = 0, d = 0;
				for (r = t.length; r--;)
					i = [parseInt(t[--r], 10), parseInt(t[r + 1], 10)], i[0] > n.position.right
							&& (n.position.right = i[0]), i[0] < n.position.left
							&& (n.position.left = i[0]), i[1] > n.position.bottom
							&& (n.position.bottom = i[1]), i[1] < n.position.top
							&& (n.position.top = i[1]), a.push(i);
				if (s = n.width = Math.abs(n.position.right - n.position.left), o = n.height = Math
						.abs(n.position.bottom - n.position.top), "c" === e
						.abbrev())
					n.position = {
						left : n.position.left + n.width / 2,
						top : n.position.top + n.height / 2
					};
				else {
					for (; s > 0 && o > 0 && h > 0 && l > 0;)
						for (s = Math.floor(s / 2), o = Math.floor(o / 2), e.x === F
								? h = s
								: e.x === P ? h = n.width - s : h += Math
										.floor(s / 2), e.y === D
								? l = o
								: e.y === O ? l = n.height - o : l += Math
										.floor(o / 2), r = a.length; r--
								&& !(2 > a.length);)
							c = a[r][0] - n.position.left, d = a[r][1]
									- n.position.top, (e.x === F && c >= h
									|| e.x === P && h >= c || e.x === N
									&& (h > c || c > n.width - h) || e.y === D
									&& d >= l || e.y === O && l >= d || e.y === N
									&& (l > d || d > n.height - l))
									&& a.splice(r, 1);
					n.position = {
						left : a[0][0],
						top : a[0][1]
					}
				}
				return n
			},
			rect : function(t, e, i, s) {
				return {
					width : Math.abs(i - t),
					height : Math.abs(s - e),
					position : {
						left : Math.min(t, i),
						top : Math.min(e, s)
					}
				}
			},
			_angles : {
				tc : 1.5,
				tr : 7 / 4,
				tl : 5 / 4,
				bc : .5,
				br : .25,
				bl : .75,
				rc : 2,
				lc : 1,
				c : 0
			},
			ellipse : function(t, e, i, s, o) {
				var n = R.polys._angles[o.abbrev()], r = 0 === n ? 0 : i
						* Math.cos(n * Math.PI), a = s * Math.sin(n * Math.PI);
				return {
					width : 2 * i - Math.abs(r),
					height : 2 * s - Math.abs(a),
					position : {
						left : t + r,
						top : e + a
					},
					adjustable : k
				}
			},
			circle : function(t, e, i, s) {
				return R.polys.ellipse(t, e, i, i, s)
			}
		}, R.svg = function(t, i, o) {
			for (var n, r, a, h, l, c, d, p, u, f, g, m = s(e), v = i[0], y = s(v.ownerSVGElement), b = 1, w = 1, _ = !0; !v.getBBox;)
				v = v.parentNode;
			if (!v.getBBox || !v.parentNode)
				return k;
			n = y.attr("width") || y.width() || parseInt(y.css("width"), 10), r = y
					.attr("height")
					|| y.height() || parseInt(y.css("height"), 10);
			var x = (parseInt(i.css("stroke-width"), 10) || 0) / 2;
			switch (x && (b += x / n, w += x / r), v.nodeName) {
				case "ellipse" :
				case "circle" :
					f = R.polys.ellipse(v.cx.baseVal.value, v.cy.baseVal.value,
							(v.rx || v.r).baseVal.value + x,
							(v.ry || v.r).baseVal.value + x, o);
					break;
				case "line" :
				case "polygon" :
				case "polyline" :
					for (u = v.points || [{
								x : v.x1.baseVal.value,
								y : v.y1.baseVal.value
							}, {
								x : v.x2.baseVal.value,
								y : v.y2.baseVal.value
							}], f = [], p = -1, c = u.numberOfItems || u.length; c > ++p;)
						d = u.getItem ? u.getItem(p) : u[p], f.push.apply(f, [
										d.x, d.y]);
					f = R.polys.polygon(f, o);
					break;
				default :
					f = v.getBoundingClientRect(), f = {
						width : f.width,
						height : f.height,
						position : {
							left : f.left,
							top : f.top
						}
					}, _ = !1
			}
			return g = f.position, y = y[0], _
					&& (y.createSVGPoint
							&& (a = v.getScreenCTM(), u = y.createSVGPoint(), u.x = g.left, u.y = g.top, h = u
									.matrixTransform(a), g.left = h.x, g.top = h.y), y.viewBox
							&& (l = y.viewBox.baseVal)
							&& l.width
							&& l.height
							&& (b *= n / l.width, w *= r / l.height)), g.left += m
					.scrollLeft(), g.top += m.scrollTop(), f
		}, R.imagemap = function(t, e, i) {
			e.jquery || (e = s(e));
			var o, n, r, a, h, l = e.attr("shape").toLowerCase().replace(
					"poly", "polygon"), c = s('img[usemap="#'
					+ e.parent("map").attr("name") + '"]'), d = s.trim(e
					.attr("coords")), p = d.replace(/,$/, "").split(",");
			if (!c.length)
				return k;
			if ("polygon" === l)
				a = R.polys.polygon(p, i);
			else {
				if (!R.polys[l])
					return k;
				for (r = -1, h = p.length, n = []; h > ++r;)
					n.push(parseInt(p[r], 10));
				a = R.polys[l].apply(this, n.concat(i))
			}
			return o = c.offset(), o.left += Math.ceil((c.outerWidth(k) - c
					.width())
					/ 2), o.top += Math.ceil((c.outerHeight(k) - c.height())
					/ 2), a.position.left += o.left, a.position.top += o.top, a
		};
		var Me, Ie = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
		s.extend(C.prototype, {
			_scroll : function() {
				var e = this.qtip.elements.overlay;
				e && (e[0].style.top = s(t).scrollTop() + "px")
			},
			init : function(i) {
				var o = i.tooltip;
				1 > s("select, object").length
						&& (this.bgiframe = i.elements.bgiframe = s(Ie)
								.appendTo(o), i._bind(o, "tooltipmove",
								this.adjustBGIFrame, this._ns, this)), this.redrawContainer = s(
						"<div/>", {
							id : X + "-rcontainer"
						}).appendTo(e.body), i.elements.overlay
						&& i.elements.overlay.addClass("qtipmodal-ie6fix")
						&& (i._bind(t, ["scroll", "resize"], this._scroll,
								this._ns, this), i._bind(o, ["tooltipshow"],
								this._scroll, this._ns, this)), this.redraw()
			},
			adjustBGIFrame : function() {
				var t, e, i = this.qtip.tooltip, s = {
					height : i.outerHeight(k),
					width : i.outerWidth(k)
				}, o = this.qtip.plugins.tip, n = this.qtip.elements.tip;
				e = parseInt(i.css("borderLeftWidth"), 10) || 0, e = {
					left : -e,
					top : -e
				}, o
						&& n
						&& (t = "x" === o.corner.precedance ? [A, F] : [B, D], e[t[1]] -= n[t[0]]()), this.bgiframe
						.css(e).css(s)
			},
			redraw : function() {
				if (1 > this.qtip.rendered || this.drawing)
					return this;
				var t, e, i, s, o = this.qtip.tooltip, n = this.qtip.options.style, r = this.qtip.options.position.container;
				return this.qtip.drawing = 1, n.height && o.css(B, n.height), n.width
						? o.css(A, n.width)
						: (o.css(A, "").appendTo(this.redrawContainer), e = o
								.width(), 1 > e % 2 && (e += 1), i = o
								.css("maxWidth")
								|| "", s = o.css("minWidth") || "", t = (i + s)
								.indexOf("%") > -1 ? r.width() / 100 : 0, i = (i
								.indexOf("%") > -1 ? t : 1)
								* parseInt(i, 10) || e, s = (s.indexOf("%") > -1
								? t
								: 1)
								* parseInt(s, 10) || 0, e = i + s ? Math.min(
								Math.max(e, s), i) : e, o.css(A, Math.round(e))
								.appendTo(r)), this.drawing = 0, this
			},
			destroy : function() {
				this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([t,
								this.qtip.tooltip], this._ns)
			}
		}), Me = R.ie6 = function(t) {
			return 6 === oe.ie ? new C(t) : k
		}, Me.initialize = "render", M.ie6 = {
			"^content|style$" : function() {
				this.redraw()
			}
		}
	})
})(window, document);
// @
// sourceMappingURL=http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.map
