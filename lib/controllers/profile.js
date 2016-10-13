ProfileController = BaseController.extend({
	template: "userPage",

	waitOn: function(){
        return Meteor.subscribe("userProfile",this.params.username);
    },
    data: function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return { userObject: user }
    }
});