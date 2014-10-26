Ext.define("com.atomunion.web.view.Scrolling", {
	onClassMixedIn : function(b) {
		Ext.Function.interceptBefore(b.prototype, "initComponent",
				this.prototype.initScrolling)
	},
	initScrolling : function() {
		this.scrollContext = "index";
		this.scrollState = {};
		this.on("afterrender", function() {
					this.getScrollEl().addListener("scroll",
							this.saveScrollState, this)
				}, this)
	},
	setScrollContext : function(b) {
		this.scrollContext = b
	},
	eraseScrollContext : function(b) {
		delete this.scrollState[b]
	},
	saveScrollState : function() {
		this.scrollState[this.scrollContext] = this.getScrollTop()
	},
	restoreScrollState : function() {
		this.setScrollTop(this.scrollState[this.scrollContext] || 0)
	},
	scrollToView : function(d, c) {
		d = Ext.get(d);
		c = c || {};
		if (d) {
			this.setScrollTop(this.getScrollTop() + d.getY() + (c.offset || 0));
			c.highlight && d.highlight()
		}
	},
	getScrollTop : function() {
		return this.getScrollEl().getScroll()["top"]
	},
	setScrollTop : function(b) {
		return this.getScrollEl().scrollTo("top", b)
	},
	scrollToTop : function() {
		this.getScrollEl().scrollTo("top")
	},
	getScrollEl : function() {
		return this.body || this.el
	}
});