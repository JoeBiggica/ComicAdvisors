AutoForm.hooks({
	submitArticleForm: {
		onSuccess: function(operation, article) {
			Router.go('singleArticle', article);
		}
	},
	updateArticleForm: {
		onSuccess: function(operation, article) {
			AutoForm.resetForm(this.formId)
			Router.go('singleArticle', article);
		}
	}
});