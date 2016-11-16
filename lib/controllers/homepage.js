HomepageController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'homepage',
	onBeforeAction: function() {
		DocHead.removeDocHeadAddedTags();
		DocHead.setTitle("Comic Advisors")
		this.next();
	},
	findOptions: function() {
		return { sort: { createdAt: -1 } };
	},
	waitOn: function() {
		return Meteor.subscribe('allArticles', this.findOptions());
	},
	data: function() {
		return { articles: Articles.find({}, { sort: { createdAt: -1 } }) };
	}
});