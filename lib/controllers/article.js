articleController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'articlePage',
	onBeforeAction: function() {
		$('body').addClass('article');
		Session.set("articleId", this.params._id);
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