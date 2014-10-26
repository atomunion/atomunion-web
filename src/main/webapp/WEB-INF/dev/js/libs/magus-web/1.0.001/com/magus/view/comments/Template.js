Ext.define("com.atomunion.web.view.comments.Template", {
	extend : "Ext.XTemplate",
	requires : ["com.atomunion.web.Auth", "com.atomunion.web.Comments"],
	statics : {
		create : function(d) {
			var c = "tpl-" + Ext.JSON.encode(d);
			if (!this[c]) {
				this[c] = new this();
				Ext.apply(this[c], d)
			}
			return this[c]
		}
	},
	constructor : function() {
		this
				.callParent([
						"<div>",
						'<tpl for=".">',
						'<div class="comment" id="{id}">',
						'<tpl if="deleted">',
						'<div class="deleted-comment">Comment was deleted. <a href="#" class="undoDeleteComment">Undo</a>.</div>',
						"<tpl else>",
						'<div class="com-meta">',
						"{[this.avatar(values.emailHash,values.photo)]}",
						'<div class="author<tpl if="moderator"> moderator" title="Sencha Engineer</tpl>">',
						"{author}",
						'<tpl if="this.isTargetVisible()">',
						'<span class="target"> on {[this.target(values.target)]}</span>',
						"</tpl>",
						"</div>",
						'<div class="top-right">',
						'<tpl for="tags">',
						'<span href="#" class="command tag">',
						"<b>{.}</b>",
						'<tpl if="this.isMod()"><a href="#" class="remove-tag" title="Delete tag">&ndash;</a></tpl>',
						"</span>",
						"</tpl>",
						'<tpl if="this.isMod()">',
						'<a href="#" class="command add-tag" title="Add new tag">+</a>',
						"</tpl>",
						'<tpl if="this.isMod()">',
						'<a href="#" class="command readComment <tpl if="read">read</tpl>">Read</a>',
						"</tpl>",
						'<tpl if="this.isMod() || this.isAuthor(values.author)">',
						'<a href="#" class="command editComment">Edit</a>',
						'<a href="#" class="command deleteComment">Delete</a>',
						"</tpl>",
						'<span class="time" title="{[this.date(values.createdAt)]}">{[this.dateStr(values.createdAt)]}</span>',
						"</div>",
						'<div class="vote">',
						'<a href="#" class="voteCommentUp{[values.upVote ? " selected" : ""]}" ',
						'title="Vote Up">&nbsp;</a>',
						'<span class="score">{score}</span>',
						'<a href="#" class="voteCommentDown{[values.downVote ? " selected" : ""]}" ',
						'title="Vote Down">&nbsp;</a>', "</div>", "</div>",
						'<div class="content">{contentHtml}</div>', "</tpl>",
						"</div>", "</tpl>", "</div>", this])
	},
	avatar : function(b,p) {
		return com.atomunion.web.Comments.avatar(b, p,this.isMod() && this.enableDragDrop
						? "drag-handle"
						: "")
	},
	isTargetVisible : function() {
		return this.showTarget
	},
	dateStr : function(e) {
		try {
			var h = Math.ceil(Number(new Date()) / 1000);
			var i = Math.ceil(Number(new Date(e)) / 1000);
			var k = h - i;
			if (k < 60) {
				return "just now"
			} else {
				if (k < 60 * 60) {
					var j = String(Math.round(k / (60)));
					return j + (j == "1" ? " minute" : " minutes") + " ago"
				} else {
					if (k < 60 * 60 * 24) {
						var j = String(Math.round(k / (60 * 60)));
						return j + (j == "1" ? " hour" : " hours") + " ago"
					} else {
						if (k < 60 * 60 * 24 * 31) {
							var j = String(Math.round(k / (60 * 60 * 24)));
							return j + (j == "1" ? " day" : " days") + " ago"
						} else {
							return Ext.Date.format(new Date(e), "jS M 'y")
						}
					}
				}
			}
		} catch (l) {
			return ""
		}
	},
	date : function(d) {
		try {
			return Ext.Date.format(new Date(d), "jS F Y g:ia")
		} catch (c) {
			return ""
		}
	},
	isMod : function() {
		return com.atomunion.web.Auth.isModerator()
	},
	isAuthor : function(b) {
		return com.atomunion.web.Auth.getUser().userName == b
	},
	target : function(h) {
		var e = h[1], g = h[1], f = "#!/api/";
		if (h[0] == "video") {
			g = "Video " + g;
			f = "#!/video/"
		} else {
			if (h[0] == "guide") {
				g = "Guide " + g;
				f = "#!/guide/"
			} else {
				if (h[2] != "") {
					e += "-" + h[2];
					if (h[0] == "class") {
						g += "#" + h[2].replace(/^.*-/, "")
					} else {
						g += " " + h[2]
					}
				}
			}
		}
		return '<a href="' + f + e + '">' + g + "</a>"
	}
});