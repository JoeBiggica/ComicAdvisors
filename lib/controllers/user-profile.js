UserProfileController = BaseController.extend({
	template: "userPage",
	onBeforeAction: function() {
		var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        if (user) {
        	if (Meteor.user()) {
				if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {
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
	},
	waitOn: function(){
        return Meteor.subscribe("userProfile",this.params.username);
    },
    data: function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return { userObject: user }
    }
});