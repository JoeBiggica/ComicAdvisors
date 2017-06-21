HomepageController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'homepage',
	onBeforeAction: function() {
		this.next();
	},
	findOptions: function() {
		return { sort: { createdAt: -1 } };
	},
	waitOn: function() {
		Meteor.subscribe('selectArticles', 0);
		Meteor.subscribe('allQuotes', this.findOptions());
	},
	data: function() {
		return { 
			articles: Articles.find(),
			quotes: Quotes.find({}, { sort: { createdAt: -1 }, limit: 1})		
		};
	}
});