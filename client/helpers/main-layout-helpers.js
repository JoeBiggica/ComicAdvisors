Template.mainLayout.helpers({
	firstName: function() {
		return Meteor.user().profile.firstname;
	},
	admin: function() {
		var user = Meteor.user();
		if (user) {
			if (Meteor.user().username == "joebiggs") {
				return true;
			}
		}
	}
})