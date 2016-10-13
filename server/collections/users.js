Meteor.publish("userProfile", function(username) {
	var user = Meteor.users.findOne({username:username});

	if (!user) {
		this.ready();
		return;
	}

	if (this.userId == user._id) {
		return Meteor.users.find(this.userId);
	} else {
		return Meteor.users.find(user._id, {
			fields: {
				"profile": 0
			}
		});
	}

});

Meteor.methods({
	checkUserExists: function(username) {
		var userFind = Meteor.users.findOne({username:username});
		 if (userFind) {
		 	return true;
		 } else {
		 	console.log('User Already Exists');
		 }
	}
});