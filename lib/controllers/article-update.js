ArticleUpdateController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'articleUpdate',
	waitOn: function() {
		return Meteor.subscribe('singleArticle', this.params._id);
	},
	data: function() {
		return { article: Articles.findOne(this.params._id) };
	}
});