AutoForm.hooks({
	submitArticleForm: {
		onSuccess: function(operation, article) {
			Router.go('singleArticle', article);
		}
	},
	updateArticleForm: {
		onSuccess: function(operation, article) {
			Router.go('singleArticle', article);
		}
	}
});