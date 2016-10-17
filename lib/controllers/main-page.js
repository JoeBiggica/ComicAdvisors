MainPageController = BaseController.extend({
	template: 'postList',
	findOptions: function() {
		return { sort: { createdAt: -1 } };
	},
	waitOn: function() {
		return Meteor.subscribe('allPosts', this.findOptions());
	},
	data: function() {
		return { posts: Posts.find({}, { sort: { createdAt: -1 } }) };
	}
});