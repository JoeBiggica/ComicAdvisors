NextArticlesController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'nextArticles',
	onBeforeAction: function() {
		this.next();
	},
	findOptions: function() {
		return { sort: { createdAt: 1 } };
	},
	waitOn: function() {
		const page_number = Number(this.params.page);
		const index_start = (page_number * 10) + 1;
		Meteor.subscribe('selectArticles', index_start);
		Meteor.subscribe('allQuotes', this.findOptions());
	},
	data: function() {
		const page_number = Number(this.params.page);
		const select_articles = Articles.find();

		return { 
			page_number: page_number,
			articles: select_articles,
			quotes: Quotes.find({}, { sort: { createdAt: -1 }, limit: 1})		
		};
	}
});