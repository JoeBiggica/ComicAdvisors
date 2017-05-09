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
		const index_start = (page_number * 10) + 1;
		console.log(index_start)
		const select_articles = Articles.find({}, { sort: { createdAt: -1 }, limit: 10, skip: index_start  });

		return { 
			page_number: page_number,
			articles: select_articles,
			quotes: Quotes.find({}, { sort: { createdAt: -1 }, limit: 1})		
		};
	}
});