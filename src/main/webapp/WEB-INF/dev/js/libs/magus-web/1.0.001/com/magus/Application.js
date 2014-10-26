Ext.define("com.atomunion.web.Application", {
	requires : ["Ext.app.Application", "com.atomunion.web.History",
			"com.atomunion.web.Auth", "com.atomunion.web.Settings",
			"com.atomunion.web.view.Viewport", "com.atomunion.web.controller.Auth",
			"com.atomunion.web.controller.Welcome","com.atomunion.web.controller.Home","com.atomunion.web.controller.SliderAndPush", "com.atomunion.web.controller.Failure",
			"com.atomunion.web.controller.Classes", "com.atomunion.web.controller.Search",
			"com.atomunion.web.controller.InlineExamples",
			"com.atomunion.web.controller.Examples", "com.atomunion.web.controller.Guides",
			"com.atomunion.web.controller.Videos", "com.atomunion.web.controller.Tabs",
			"com.atomunion.web.controller.Comments",
			"com.atomunion.web.controller.CommentCounts", "com.atomunion.web.controller.Tests","com.atomunion.web.controller.Avatar","com.atomunion.web.view.Loading"],
	constructor : function() {
		com.atomunion.web.Auth.init(this.createApp, this);
	},
	createApp : function() {
		Ext.application({
					name : "com.atomunion.web",
					controllers : ["Auth", "Welcome","Home", "Failure", "Classes",
							"Search", "InlineExamples", "Examples", "Guides",
							"Videos", "Tabs", "Comments", "CommentCounts",
							"Tests","Avatar"],
					launch : this.launch
				});
	},
	launch : function() {
		com.atomunion.web.App = this;
		com.atomunion.web.Settings.init();
		Ext.create("com.atomunion.web.view.Viewport");
		com.atomunion.web.History.init();
		if (com.atomunion.web.initEventTracking) {
			com.atomunion.web.initEventTracking();
		}
		com.atomunion.web.view.Loading.finish();
	}
});