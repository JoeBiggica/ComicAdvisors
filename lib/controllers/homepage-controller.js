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
		Meteor.subscribe('allArticles', this.findOptions());
		Meteor.subscribe('allQuotes', this.findOptions());
	},
	data: function() {
		return { 
			articles: Articles.find({}, { sort: { createdAt: -1 }, limit: 1}),
			quotes: Quotes.find({}, { sort: { createdAt: -1 }, limit: 1})		
		};
	}
});