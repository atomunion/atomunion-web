Ext.define("com.atomunion.web.view.auth.Form", {
			extend : "com.atomunion.web.view.auth.BaseForm",
			alias : "widget.authForm",
			componentCls : "auth-form",
			initComponent : function() {
				this.html = [
						'<span class="before-text">Sign in to post a comment:</span>',
						this.createLoginFormHtml()];
				this.callParent(arguments)
			},
			afterRender : function() {
				this.callParent(arguments);
				this.bindFormSubmitEvent()
			}
		});