articleStaticController = RouteController.extend({
	action: function() {
		// SSR.compileTemplate('articlePageAMP', Assets.getText('article-page-amp.html'));
		var articleId = (this.params._id).split(':')[1];
		var response = this.response;
		Meteor.call('ssrArticle', articleId, function(error, result) {
			if (result) {
				response.end(result);
			} else {
				console.log('Error: Article request did not complete.');
			}
		})
	}
});

