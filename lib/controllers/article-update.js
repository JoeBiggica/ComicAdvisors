ArticleUpdateController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'articleUpdate',
	onBeforeAction: function() {
		$('body').addClass('admin');
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
	onStop: function() {
        $('body').removeClass('admin');
    },
	waitOn: function() {
		return Meteor.subscribe('singleArticle', this.params._id);
	},
	data: function() {
		return { article: Articles.findOne(this.params._id) };
	}
});