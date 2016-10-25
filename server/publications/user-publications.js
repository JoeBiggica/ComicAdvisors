Meteor.publish("userProfile", function(username) {
	var user = Meteor.users.findOne({username:username});

	if (!user) {
		this.ready();
		return;
	}

	if (this.userId == user._id) {
		return Meteor.users.find(this.userId);
	} else {
		return Meteor.users.find(user._id);
		// return Meteor.users.find(user._id, {
		// 	fields: {
		// 		"profile": 0
		// 	}
		// });
	}
});

Meteor.publish('userList', function() {
	return Meteor.users.find();
});

Meteor.publish('userArticlesList', function(username) {
	var user = Meteor.users.findOne({username:username});
	return Articles.find({userId: user._id});
});