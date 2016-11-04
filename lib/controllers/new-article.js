NewArticleController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'newArticle',
	onBeforeAction: function() {
		$('body').addClass('admin');
        var user = Meteor.user();
        if (user) {
			if (Meteor.user().profile.accesslevel == "ca-admin") {
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
    }
});