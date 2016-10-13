Template.logout.helpers({
	firstName: function() {
		return Meteor.user().profile.firstname;
	}
})

Template.userList.helpers({
	firstName: function() {
		return Meteor.users.findOne(this._id).profile.firstname;
	},
	email: function() {
		return Meteor.users.findOne(this._id).emails[0].address;
	}
});

Template.userPage.helpers({
	firstName: function() {
		var firstName = window.location.pathname.split('/users/')[1].split('/')[0];
		return firstName;
	},
	email: function() {
		return Meteor.user().emails[0].address;
	}
});