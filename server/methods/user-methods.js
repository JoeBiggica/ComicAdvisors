Meteor.methods({
	isAdmin: function() {
		if (Meteor.user()) {
			if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	checkUserExists: function(username) {
		var userFind = Meteor.users.findOne({username:username});
		 if (userFind) {
		 	return true;
		 } else {
		 	console.log('User Already Exists');
		 }
	},
	getUserId: function(username) {
		var user = Meteor.users.findOne({username:username});
		var userId = user._id;
		return userId;
	}
});