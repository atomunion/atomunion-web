Ext.define("com.atomunion.web.view.Introduction", {
	singleton : true,
	constructor : function() {
		this.introduction = Ext.get("introduction");
	},
	execute : function() {
		var scope = this, lis = $(".introduction-si").find("ul > li"), len = lis.length;
		if (scope.introduction) {
			scope.introduction.show();
		}
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				var li = $(lis[i]);

				li.find("img").each(function() {
					var target = $(this).attr("target");
					var at = ($(this).attr("at") || "center center").split(' ');

					var my = ($(this).attr("my") || "0% 0%").split(' ');

					$(".introduction-si").show();
					if (target) {
						var offset = $(target).offset(), width = $(target)
								.width(), height = $(target).height(), w = $(this)
								.width(), h = $(this).height();
						if (offset) {
							var left = offset.left, top = offset.top, wp = 0, hp = 0;

							if (at[0] == "right") {
								left += width;
							} else if (at[0] == "center") {
								left += width / 2;
							}

							if (at[1] == "bottom") {
								top += height;
							} else if (at[1] == "center") {
								top += height / 2;
							}

							hp = parseFloat(my[1]);
							if (my[1].indexOf("%") != -1) {
								hp = hp / 100;
							}
							wp = parseFloat(my[0]);
							if (my[0].indexOf("%") != -1) {
								wp = wp / 100;
							}

							top -= h * ((hp > 0 && hp <= 1) ? hp : 0);
							left -= w * ((wp > 0 && wp <= 1) ? wp : 0);

							$(this).css({
										top : top,
										left : left
									});
						}
					}
				});

				if (i == 0) {
					li.addClass("active");
				} else {
					li.hide();
				}
			}
			// $(".introduction-si .tools").css({
			// top : $(window).height()*0.9,
			// left : $(window).width()-150
			// });

			$(".introduction-si .tools .more-icon").on("click", function() {
				scope.introduction.hide();
				var skip = $("#notify-si").prop("checked");
				if (skip) {
					$.ajax({
								url : 'security/introduction',
								dataType : 'json',
								type : 'POST',
								data : {
									format : 'json',
									"skip" : skip
								},
								success : function(json) {
									if (json && json.success) {

									} else {

									}
								},
								error : function(jqXHR, textStatus, errorThrown) {
								},
								timeout : 10000
							});
				}
			});
			$(".introduction-si .tools .button-link").on("click", function() {
						var active = $(".introduction-si ul > li.active");
						active.removeClass("active").hide();
						var next = active.next();
						if (next && next.length > 0) {
							next.addClass("active").show();
							next = next.next();
							if (!next || next.length <= 0) {
								$(this).html("进入系统");
							}
						} else {
							$(".introduction-si .tools .more-icon").click();
						}

					});
		}
	}
});