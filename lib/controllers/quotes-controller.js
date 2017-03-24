QuoteListController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'quoteList',
	onBeforeAction: function() {
		this.next();
	},
	findOptions: function() {
		return { sort: { createdAt: -1 } };
	},
	waitOn: function() {
		return Meteor.subscribe('allQuotes', this.findOptions());
	},
	data: function() {
		return { quotes: Quotes.find({}, { sort: { createdAt: -1 } }) };
	}
});