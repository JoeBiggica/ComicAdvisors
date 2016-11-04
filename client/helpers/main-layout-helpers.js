Template.mainLayout.helpers({
	firstName: function() {
		return Meteor.user().profile.firstname;
	},
	admin: function() {
		if (Meteor.user()) {
			if (Meteor.user().username == "joebiggica" || Meteor.user().username == "ridy" || Meteor.user().username == "waterexodus" || Meteor.user().username == "buttah") {
				return true;
			}
		}
	}
})