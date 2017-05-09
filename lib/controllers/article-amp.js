ArticleAMPController = RouteController.extend({
	action: function() {
		var articleId = (this.params._id);
		var response = this.response;
		Meteor.call('ssrArticleAMP', articleId, function(error, result) {
			if (result) {
				response.end(result);
			} else {
				console.log('Error: Article request did not complete.');
			}
		})
	}
});