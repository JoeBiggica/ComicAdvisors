SingleArticleController = BaseController.extend({
	template: 'articlePage',
	waitOn: function() {
		return Meteor.subscribe('singleArticle', this.params._id);
	},
	data: function() {
		return Articles.findOne(this.params._id);
	}
});