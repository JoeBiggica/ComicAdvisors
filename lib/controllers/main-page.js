MainPageController = BaseController.extend({
	template: 'articleList',
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