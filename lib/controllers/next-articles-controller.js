NextArticlesController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'homepage',
	onBeforeAction: function() {
		this.next();
	},
	findOptions: function() {
		return { sort: { createdAt: 1 } };
	},
	waitOn: function() {
		Meteor.subscribe('allArticles', this.findOptions());
		Meteor.subscribe('allQuotes', this.findOptions());
	},
	data: function() {

		const page_number = Number(this.params.page);
		const index_start = page_number + 1;
		const select_articles = Articles.find({}, { sort: { createdAt: -1 }, limit: 1, skip: index_start  });

		return { 
			articles: select_articles,
			quotes: Quotes.find({}, { sort: { createdAt: -1 }, limit: 1})		
		};
	}
});