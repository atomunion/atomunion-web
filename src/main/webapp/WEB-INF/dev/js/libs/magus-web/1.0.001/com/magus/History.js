Ext.define("com.atomunion.web.History", {
	requires : ["Ext.util.History"],
	singleton : true,
	init : function() {
		Ext.util.History.useTopWindow = false;
		Ext.util.History.init(function() {
					this.historyLoaded = true;
					this.initialNavigate();
				}, this);
		Ext.util.History.on("change", function(b) {
					this.navigate(b, true);
				}, this);
	},
	notifyTabsLoaded : function() {
		this.tabsLoaded = true;
		this.initialNavigate();
	},
	initialNavigate : function() {
		if (this.tabsLoaded && this.historyLoaded) {
			this.navigate(Ext.util.History.getToken(), true);
		}
	},
	navigate : function(e, g) {
		var f = this.parseToken(e);

		if (f.href === "#!/example") {
			com.atomunion.web.App.getController("Examples").loadIndex();
		} else {
			if (f.type === "example") {
				com.atomunion.web.App.getController("Examples").loadExample(f.href,
						g);
			} else {
				if (f.href === "#!/avatar") {
					com.atomunion.web.App.getController("Examples").loadIndex();
				} else {
					if (f.type === "avatar") {
						com.atomunion.web.App.getController("Avatar").loadAvatar(f,
								g);
					} else {
						if (f.href == "#!/api") {
							com.atomunion.web.App.getController("Classes")
									.loadIndex(g);
						} else {
							if (f.type === "api") {
								com.atomunion.web.App.getController("Classes")
										.loadClass(f.href, g);
							} else {
								if (f.href === "#!/guide") {
									com.atomunion.web.App.getController("Guides")
											.loadIndex(g);
								} else {
									if (f.type === "guide") {
										com.atomunion.web.App
												.getController("Guides")
												.loadGuide(f.href, g);
									} else {
										if (f.href === "#!/video") {
											com.atomunion.web.App
													.getController("Videos")
													.loadIndex(g);
										} else {
											if (f.type === "video") {
												com.atomunion.web.App
														.getController("Videos")
														.loadVideo(f.href, g);

											} else {
												if (f.href === "#!/comment") {
													com.atomunion.web.App
															.getController("Comments")
															.loadIndex();
												} else {
													if (f.href === "#!/tests") {
														com.atomunion.web.App
																.getController("Tests")
																.loadIndex();
													} else {
														if (f.href === "#!/home") {
															com.atomunion.web.App
																	.getController("Home")
																	.loadIndex(g);
														} else {
															if (com.atomunion.web.App
																	.getController("Welcome")
																	.isActive()) {
																com.atomunion.web.App
																		.getController("Welcome")
																		.loadIndex(g);
															} else {
																if (!this.noRepeatNav) {
																	this.noRepeatNav = true;
																	var h = Ext
																			.getCmp("doctabs").staticTabs[0];
																	if (h) {
																		this
																				.navigate(
																						h.href,
																						g);
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	parseToken : function(d) {
		var c = d
				&& d
						.match(/!?(\/(home|api|guide|example|video|comment|tests|avatar)(\/(.*))?)/);
		return c ? {
			href : "#!" + c[1],
			type : c[2],
			url : c[4]
		} : {};
	},
	push : function(e, f) {
		e = this.cleanUrl(e);
		if (!/^#!?/.test(e)) {
			e = "#!" + e;
		}
		var d = Ext.util.History.getToken() || "";
		if ("#" + d.replace(/^%21/, "!") !== e) {
			Ext.util.History.add(e);
		}
	},
	cleanUrl : function(b) {
		return b.replace(/^[^#]*#/, "#");
	}
});