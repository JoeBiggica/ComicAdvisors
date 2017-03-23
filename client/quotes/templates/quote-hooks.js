AutoForm.hooks({
	submitQuoteForm: {
		onSuccess: function(operation, article) {
			Router.go('quoteList', article);
		}
	}
});