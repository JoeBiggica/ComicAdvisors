NewArticleController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'newArticle',
	onBeforeAction: function() {
		$('body').addClass('admin');
        var user = Meteor.user();
        if (user) {
			if (Meteor.user().username == "joebiggica" || Meteor.user().username == "ridy" || Meteor.user().username == "waterexodus" || Meteor.user().username == "buttah") {
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