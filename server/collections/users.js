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

// Meteor.publish('userArticlesList', function(username) {
// 	var user = Meteor.users.findOne({username:username});
// 	var userArticles = Articles.find({userId: user._id}).fetch();
// 	return userArticles;
// });

Meteor.methods({
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