ArticleUpdateController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'articleUpdate',
	onBeforeAction: function() {
        var user = Meteor.user();
        if (user) {
			if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {
				this.next();
			} else {
				this.render('notFound');
			}
        } else {
        	this.render('notFound');
        }
	},
	waitOn: function() {
		return Meteor.subscribe('singleArticle', this.params._id);
	},
	data: function() {
		return { article: Articles.findOne(this.params._id) };
	}
});