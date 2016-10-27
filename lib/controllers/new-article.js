NewArticleController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'newArticle',
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
	}
});