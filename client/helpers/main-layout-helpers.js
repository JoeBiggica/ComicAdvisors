Template.mainLayout.helpers({
	firstName: function() {
		return Meteor.user().profile.firstname;
	},
	admin: function() {
		if (Meteor.user()) {
			if (Meteor.user().profile.accesslevel == "ca-admin") {
				return true;
			}
		}
	}
})