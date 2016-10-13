ProfileController = BaseController.extend({
	template: "userPage",

	waitOn: function(){
		console.log(this.params.username)
        return Meteor.subscribe("userProfile",this.params.username);
    },
    data: function(){
        var username = Router.current().params.username;
        console.log(Meteor.users.findOne({username:username}))
        return Meteor.users.findOne({username:username});
    }
});