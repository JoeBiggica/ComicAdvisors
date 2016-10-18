Template.mainLayout.helpers({
	firstName: function() {
		return Meteor.user().profile.firstname;
	},
	admin: function() {
		if (Meteor.user()) {
			if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {
				return true;
			}
		}
	}
})