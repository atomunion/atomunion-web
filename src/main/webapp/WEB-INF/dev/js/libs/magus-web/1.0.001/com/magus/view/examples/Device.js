Ext.define("com.atomunion.web.view.examples.Device", {
	config : {
		url : "",
		id : undefined,
		device : "phone",
		orientation : "landscape"
	},
	constructor : function(b) {
		this.initConfig(b);
		Ext.apply(this, this.getIframeSize());
		this.id = this.id || Ext.id();
		this.tpl = new Ext.XTemplate(
				'<div class="touchExample {device} {orientation}">',
				'<iframe id={id} style="width: {width}; height: {height};" frameborder="0" ',
				'src="{[this.deviceUrl(values)]}"></iframe>', "</div>", {
					deviceUrl : function(a) {
						return a.url + "?deviceType="
								+ (a.device === "tablet" ? "Tablet" : "Phone")
					}
				})
	},
	toHtml : function() {
		return this.tpl.apply(this)
	},
	setDevice : function(b) {
		this.device = b;
		Ext.apply(this, this.getIframeSize())
	},
	setOrientation : function(b) {
		this.orientation = b;
		Ext.apply(this, this.getIframeSize())
	},
	getIframeSize : function() {
		var b = {
			phone : {
				width : "481px",
				height : "320px"
			},
			miniphone : {
				width : "320px",
				height : "219px"
			},
			tablet : {
				width : "717px",
				height : "538px"
			}
		}[this.device];
		if (this.orientation === "landscape") {
			return b
		} else {
			return {
				width : b.height,
				height : b.width
			}
		}
	}
});