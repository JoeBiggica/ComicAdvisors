AutoForm.hooks({
	submitArticleForm: {
		onSuccess: function(operation, article) {
			Router.go('singleArticle', article);
		}
	}
});