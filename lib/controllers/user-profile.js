UserProfileController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: "userPage",
	onBeforeAction: function() {
        $('body').addClass('admin');
		var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        if (user) {
        	if (Meteor.user()) {
				if (Meteor.user().profile.accesslevel == "ca-admin") {
					this.next();
				} else {
					this.render('notFound');
				}
			} else {
				this.render('notFound');
			}
        } else {
        	this.render('notFound');
        }
        Session.set("queryUsername", username);
	},
    onStop: function() {
        $('body').removeClass('admin');
    },
	waitOn: function(){
        return Meteor.subscribe("userProfile",this.params.username);
    },
    data: function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        var articles = Meteor.subscribe("userArticlesList",username);
        return {
        	userObject: user,
        	articles: Articles.find({}, { sort: { createdAt: -1 } })
        }
    }
});