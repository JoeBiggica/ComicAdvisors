AutoForm.hooks({
	submitArticleForm: {
		onSuccess: function(operation, article) {
			Router.go('singleArticle', article);
		}
	},
	updateArticleForm: {
		onSuccess: function(operation) {
			var article = Articles.findOne(this.docId);
			Router.go('singleArticle', article);
		}
	}
});