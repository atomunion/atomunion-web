Ext.define("com.atomunion.web.Comments", {
	extend : "Ext.util.Observable",
	singleton : true,
	requires : ["com.atomunion.web.CommentCounts",
			"com.atomunion.web.CommentSubscriptions", "Ext.data.JsonP", "Ext.Ajax"],
	init : function(c, d, a) {
		if (!(com.atomunion.web.data.commentsUrl
				&& com.atomunion.web.data.commentsDomain && this
				.isBrowserSupported())) {
			c.call(d);
			return;
		}

		if (a) {
			this.enabled = true;
			this.fetchCountsAndSubscriptions(function(f, b) {
						this.counts = new com.atomunion.web.CommentCounts(f);
						this.subscriptions = new com.atomunion.web.CommentSubscriptions(b);
						c.call(d);
					}, this);
		} else {
			c.call(d)
		}
	},
	isBrowserSupported : function() {
		/*
		 * return ("withCredentials" in new XMLHttpRequest()) || (Ext.ieVersion >=
		 * 8)
		 */
		return true;
	},
	initComment : function() {
		if (!(com.atomunion.web.data.commentsUrl
				&& com.atomunion.web.data.commentsDomain && this
				.isBrowserSupported())) {
			return;
		}
		this.enabled = true;
		this.fetchCountsAndSubscriptions(function(f, b) {
					this.counts = new com.atomunion.web.CommentCounts(f);
					this.subscriptions = new com.atomunion.web.CommentSubscriptions(b);
				}, this);
	},
	fetchCountsAndSubscriptions : function(c, d) {
		this.request("jsonp", {
					url : "/comments_meta",
					method : "GET",
					success : function(a) {
						c.call(d, a.comments, a.subscriptions)
					},
					scope : this
				})
	},
	loadSubscriptions : function(c, d) {
		this.fetchSubscriptions(function(a) {
					this.subscriptions = new com.atomunion.web.CommentSubscriptions(a);
					c.call(d)
				}, this)
	},
	clearSubscriptions : function() {
		this.subscriptions = new com.atomunion.web.CommentSubscriptions([])
	},
	fetchSubscriptions : function(c, d) {
		this.request("jsonp", {
					url : "/subscriptions",
					method : "GET",
					success : function(a) {
						c.call(d, a.subscriptions)
					},
					scope : this
				})
	},
	isEnabled : function() {
		return this.enabled
	},
	getCount : function(b) {
		return this.enabled ? this.counts.get(b) : 0
	},
	changeCount : function(f, e) {
		var d = this.counts.change(f, e);
		this.fireEvent("countChange", f, d)
	},
	hasSubscription : function(b) {
		return this.subscriptions.has(b)
	},
	getClassTotalCount : function(b) {
		return this.counts.getClassTotal(b)
	},
	load : function(d, f, e) {
		this.request("jsonp", {
					url : "/comments",
					method : "GET",
					params : {
						startkey : Ext.JSON.encode(d)
					},
					success : f,
					scope : e
				})
	},
	loadReplies : function(f, d, e) {
		this.request("jsonp", {
					url : "/replies",
					method : "GET",
					params : {
						parentId : f
					},
					success : d,
					scope : e
				})
	},
	post : function(b) {
		this.request("ajax", {
					url : "/comments",
					method : "POST",
					params : {
						target : Ext.JSON.encode(b.target),
						parentId : b.parentId,
						comment : b.content,
						url : this.buildPostUrl(b.target)
					},
					callback : function(h, f, a) {
						var g = Ext.JSON.decode(a.responseText);
						if (f && g.success) {
							this.changeCount(b.target, +1);
							b.callback && b.callback.call(b.scope, g.comment)
						}
					},
					scope : this
				})
	},
	buildPostUrl : function(i) {
		var f = i[0];
		var g = i[1];
		var h = i[2];
		if (f == "video") {
			var j = "#!/video/" + g
		} else {
			if (f == "guide") {
				var j = "#!/guide/" + g
			} else {
				var j = "#!/api/" + g + (h ? "-" + h : "")
			}
		}
		return "http://" + window.location.host + window.location.pathname + j
	},
	subscribe : function(h, e, g, f) {
		this.request("ajax", {
					url : "/subscribe",
					method : "POST",
					params : {
						target : Ext.JSON.encode(h),
						subscribed : e
					},
					callback : function(c, a, d) {
						var b = Ext.JSON.decode(d.responseText);
						if (a && b.success) {
							this.subscriptions.set(h, e);
							g && g.call(f)
						}
					},
					scope : this
				})
	},
	request : function(c, d) {
		d.url = this.buildRequestUrl(d.url);
		if (c === "jsonp") {
			Ext.data.JsonP.request(d)
		} else {
			// d.cors = true;
			Ext.Ajax.request(d)
		}
	},
	buildRequestUrl : function(b) {
		b = com.atomunion.web.data.commentsUrl + "/"
				+ com.atomunion.web.data.commentsDomain + b;
		return b + (b.match(/\?/) ? "&" : "?") + "sid="
				+ com.atomunion.web.Auth.getSid()
	},
	avatar : function(c, p, d) {
		var src = p ? p : 'http://www.gravatar.com/avatar/' + c
				+ '?s=25&amp;r=PG&amp;d=identicon';
		return '<img class="avatar ' + (d || "")
				+ '" width="25" height="25" src="' + src + '">'
	},
	counterHtml : function(b) {
		return b > 0
				? '<span class="comment-counter-small">' + b + "</span>"
				: ""
	}
});