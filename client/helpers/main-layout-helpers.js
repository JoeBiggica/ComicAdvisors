Template.mainLayout.helpers({
	firstName: function() {
		return Meteor.user().profile.firstname;
	}
})