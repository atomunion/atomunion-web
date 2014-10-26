Ext.define("com.atomunion.web.model.Comment", {
			extend : "Ext.data.Model",
			requires : ["com.atomunion.web.Comments"],
			fields : [{
						name : "id",
						mapping : "_id"
					}, "author", "emailHash", "moderator", "createdAt",
					"target", "score", "upVote", "downVote", "contentHtml",
					"read", "tags", "deleted", "parentId", "replyCount"],
			proxy : {
				type : "ajax",
				reader : "json"
			},
			vote : function(c, d) {
				this.request({
							method : "POST",
							url : "/comments/" + this.get("id"),
							params : {
								vote : c
							},
							success : function(a) {
								this.set("upVote", a.direction === "up");
								this.set("downVote", a.direction === "down");
								this.set("score", a.total);
								this.commit()
							},
							failure : Ext.Function.bind(d.failure, d.scope),
							scope : this
						})
			},
			loadContent : function(c, d) {
				this.request({
							url : "/comments/" + this.get("id"),
							method : "GET",
							success : function(a) {
								c.call(d, a.content)
							},
							scope : this
						})
			},
			saveContent : function(b) {
				this.request({
							url : "/comments/" + this.get("id"),
							method : "POST",
							params : {
								content : b
							},
							success : function(a) {
								this.set("contentHtml", a.content);
								this.commit()
							},
							scope : this
						})
			},
			setDeleted : function(b) {
				this.request({
							url : "/comments/" + this.get("id")
									+ (b ? "/delete" : "/undo_delete"),
							method : "POST",
							success : function() {
								this.set("deleted", b);
								this.commit();
								com.atomunion.web.Comments.changeCount(this
												.get("target"), b ? -1 : +1)
							},
							scope : this
						})
			},
			markRead : function() {
				this.request({
							url : "/comments/" + this.get("id") + "/read",
							method : "POST",
							success : function() {
								this.set("read", true);
								this.commit()
							},
							scope : this
						})
			},
			setParent : function(d, f, e) {
				this.request({
							url : "/comments/" + this.get("id") + "/set_parent",
							method : "POST",
							params : d ? {
								parentId : d.get("id")
							} : undefined,
							success : f,
							scope : e
						})
			},
			addTag : function(b) {
				this.changeTag("add_tag", b, function() {
							this.get("tags").push(b)
						}, this)
			},
			removeTag : function(b) {
				this.changeTag("remove_tag", b, function() {
							Ext.Array.remove(this.get("tags"), b)
						}, this)
			},
			changeTag : function(h, e, g, f) {
				this.request({
							url : "/comments/" + this.get("id") + "/" + h,
							method : "POST",
							params : {
								tagname : e
							},
							success : function() {
								g.call(f);
								this.commit()
							},
							scope : this
						})
			},
			request : function(b) {
				com.atomunion.web.Comments.request("ajax", {
							url : b.url,
							method : b.method,
							params : b.params,
							callback : function(h, f, a) {
								var g = Ext.JSON.decode(a.responseText);
								if (f && g.success) {
									b.success && b.success.call(b.scope, g)
								} else {
									b.failure
											&& b.failure
													.call(b.scope, g.reason)
								}
							},
							scope : this
						})
			}
		});