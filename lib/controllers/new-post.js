NewPostController = BaseController.extend({
	template: 'newPost',

	onBeforeAction: function() {
		if (!Meteor.user()) {
			if (Meteor.loggedIn()) {
				this.render(this.loadingTemplate);
			} else {
				this.render('accessDenied');
			}
		} else {
			this.next();
		}
	}
});