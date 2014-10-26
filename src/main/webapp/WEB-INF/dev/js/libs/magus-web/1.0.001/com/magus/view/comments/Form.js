Ext.define("com.atomunion.web.view.comments.Form", {
	extend : "Ext.Component",
	alias : "widget.commentsForm",
	requires : ["com.atomunion.web.Tip"],
	tpl : [
			'<form class="commentForm <tpl if="!updateComment">newComment</tpl>">',
			'<tpl if="title">',
			"<p>{title}</p>",
			"</tpl>",
			"<textarea>{content}</textarea>",
			'<div class="com-meta">',
			"{[com.atomunion.web.Comments.avatar(values.user.emailHash,values.user.photo)]}",
			'<div class="form-author">Logged in as {user.userName}</div>',
			'<tpl if="!updateComment">',
			'<label class="subscribe">',
			'Email updates? <input type="checkbox" class="subscriptionCheckbox" <tpl if="userSubscribed">checked="checked"</tpl> />',
			'<span class="sep"> | </span>',
			"</label>",
			"</tpl>",
			'<a href="#" class="toggleCommentGuide">Show help &#8595;</a>',
			'<input type="submit" class="sub submitComment" value="{[values.updateComment ? "Update" : "Post"]} comment" />',
			'<tpl if="updateComment">',
			' or <a href="#" class="cancelUpdateComment">cancel</a>',
			"</tpl>",
			"</div>",
			'<div class="commentGuideTxt" style="display: none;">',
			"<ul>",
			'<li>Use <strong><a href="http://daringfireball.net/projects/markdown/syntax" target="_blank">Markdown</a></strong>',
			" for formatting:</li>",
			"</ul>",
			'<div class="markdown preview">',
			"<h4>Markdown</h4>",
			"<pre>",
			"**Bold**, _italic_\n",
			"and `monospaced font`.\n",
			"\n",
			"    Indent with 4 spaces\n",
			"    for a code block.\n",
			"\n",
			"1. numbered lists\n",
			"2. are cool\n",
			"\n",
			"- bulleted lists\n",
			"- make your point\n",
			"\n",
			"[External link](http//example.com)\n",
			"\n",
			"Leave a blank line\n",
			"between paragraphs.\n",
			"</pre>",
			"</div>",
			'<div class="markdown result">',
			"<h4>Result</h4>",
			"<strong>Bold</strong>, <em>italic</em> and<br/>",
			"<code>monospaced font</code>.<br/>",
			'<pre class="prettyprint">',
			"Indent with 4 spaces\n",
			"for a code block.",
			"</pre>",
			"<ol>",
			"<li>numbered lists</li>",
			"<li>are cool</li>",
			"</ol>",
			"<ul>",
			"<li>bulleted lists</li>",
			"<li>make your point</li>",
			"</ul>",
			'<a href="http://example.com">External link</a><br/>',
			"<br/>",
			"Leave a blank line between paragraphs.<br/><br/>",
			"</div>",
			"<ul>",
			"<li>Use comments to:",
			"<ul>",
			"<li>Inform us about <strong>bugs in documentation.</strong></li>",
			"<li>Give <strong>useful tips</strong> to other developers.</li>",
			"<li><strong>Warn about bugs</strong> and problems that might bite.</li>",
			"</ul>",
			"</li>",
			"<li>Don't post comments for:",
			"<ul>",
			"<li><strong>Questions about code or usage</strong>",
			' - use the <a href="http://www.sencha.com/forum" target="_blank">Sencha Forum</a>.</li>',
			"<li><strong>SDK bugs</strong>",
			' - use the <a href="http://www.sencha.com/forum" target="_blank">Sencha Forum</a>.</li>',
			"<li><strong>com.atomunion.web App bugs</strong>",
			' - use the <a href="https://github.com/senchalabs/jsduck/issues" target="_blank">GitHub Issue tracker</a>.</li>',
			"</ul></li>",
			"<li>Comments may be edited or deleted at any time by a moderator.</li>",
			'<li>Avatars can be managed at <a href="http://www.gravatar.com" target="_blank">Gravatar</a> (use your forum email address).</li>',
			"<li>To write a reply use <strong><code>@username</code></strong> syntax &ndash; the user will get notified.</li>",
			"</ul>", "</div>", "</form>"],
	initComponent : function() {
		this.data = {
			title : this.title,
			updateComment : (this.content !== undefined),
			content : this.content,
			userSubscribed : this.userSubscribed,
			user : this.user
		};
		this.callParent(arguments)
	},
	setValue : function(b) {
		this.codeMirror.setValue(b)
	},
	afterRender : function() {
		this.callParent(arguments);
		this.makeCodeMirror(this.getEl().down("textarea").dom);
		this.bindEvents()
	},
	makeCodeMirror : function(d) {
		var c = true;
		this.codeMirror = CodeMirror.fromTextArea(d, {
					mode : "markdown",
					lineWrapping : true,
					indentUnit : 4,
					extraKeys : {
						Tab : "indentMore",
						"Shift-Tab" : "indentLess"
					},
					onFocus : Ext.Function.bind(function() {
								if (c && this.codeMirror.getValue() === "") {
									this.toggleGuide(true)
								}
								c = false
							}, this)
				})
	},
	bindEvents : function() {
		this.getEl().on("click", function() {
					this.toggleGuide()
				}, this, {
					preventDefault : true,
					delegate : "a.toggleCommentGuide"
				});
		this.getEl().on("click", function() {
					this.fireEvent("cancel")
				}, this, {
					preventDefault : true,
					delegate : "a.cancelUpdateComment"
				});
		this.getEl().on("click", function() {
					this.fireEvent("submit", this.codeMirror.getValue())
				}, this, {
					preventDefault : true,
					delegate : "input.submitComment"
				});
		this.getEl().on("click", function(c, d) {
					this
							.fireEvent("subscriptionChange",
									Ext.get(d).dom.checked)
				}, this, {
					delegate : "input.subscriptionCheckbox"
				})
	},
	toggleGuide : function(f) {
		var d = this.getEl().down(".commentGuideTxt");
		d.setVisibilityMode(Ext.dom.Element.DISPLAY);
		var e = this.getEl().down(".toggleCommentGuide");
		if (!d.isVisible() || f === true) {
			d.show(true);
			e.update("Hide help &#8593;")
		} else {
			d.hide(true);
			e.update("Show help &#8595;")
		}
	},
	showSubscriptionMessage : function(d) {
		var e = this.getEl().down("input.subscriptionCheckbox");
		var f = d
				? "Updates to this thread will be e-mailed to you"
				: "You have unsubscribed from this thread";
		com.atomunion.web.Tip.show(f, e, "bottom")
	}
});