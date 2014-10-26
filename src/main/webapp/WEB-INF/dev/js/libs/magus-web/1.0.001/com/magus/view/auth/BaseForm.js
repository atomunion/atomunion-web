Ext.define("com.atomunion.web.view.auth.BaseForm", {
	extend : "Ext.Component",
	requires : ["com.atomunion.web.Tip", "com.atomunion.web.Auth"],
	createLoginFormHtml : function() {
		return [
				'<form class="loginForm">',
				'<input class="username" type="text" name="username" placeholder="Username" />',
				'<input class="password" type="password" name="password" placeholder="Password" />',
				'<label><input type="checkbox" name="remember" /> Remember Me</label>',
				'<input class="submit" type="submit" value="Sign in" />',
				" or ",
				'<a class="register" href="'
						+ com.atomunion.web.Auth.getRegistrationUrl()
						+ '" target="_blank">Register</a>', "</form>"].join("")
	},
	bindFormSubmitEvent : function() {
		this.getEl().down("form").on("submit", this.submitLogin, this, {
					preventDefault : true
				})
	},
	submitLogin : function(m, h) {
		var n = Ext.get(h);
		var j = n.down("input[name=username]").getValue();
		var i = n.down("input[name=password]").getValue();
		var l = n.down("input[name=remember]");
		var k = l ? !!(l.getAttribute("checked")) : false;
		this.fireEvent("login", this, j, i, k)
	},
	showMessage : function(c) {
		var d = this.getEl().down("input[type=submit]");
		com.atomunion.web.Tip.show(c, d, "bottom")
	}
});