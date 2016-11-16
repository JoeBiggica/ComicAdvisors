SingleArticleController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'articlePage',
	onBeforeAction: function() {
		$('body').addClass('article');
		var article = Articles.findOne(this.params._id);
		console.log(article.title)
		DocHead.setTitle(article.title)
		this.next();
	},
	onStop: function() {
		$('body').removeClass('article');
	},
	waitOn: function() {
		return Meteor.subscribe('singleArticle', this.params._id);
	},
	data: function() {
		return Articles.findOne(this.params._id);
	}
});