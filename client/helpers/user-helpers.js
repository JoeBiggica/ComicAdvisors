Template.logout.helpers({
	firstName: function() {
		return Meteor.user().profile.firstname;
	},
	username: function() {
		return Meteor.user().username;
	}
})

Template.userList.helpers({
	firstName: function() {
		return Meteor.users.findOne(this._id).profile.firstname;
	},
	email: function() {
		return Meteor.users.findOne(this._id).emails[0].address;
	},
	username: function() {
		return Meteor.users.findOne(this._id).username;
	}
});

Template.userPage.helpers({
	firstName: function() {
		var firstName = Meteor.users.findOne(this.userObject._id).profile.firstname;
		return firstName;
	},
	lastName: function() {
		var lastName = Meteor.users.findOne(this.userObject._id).profile.lastname;
		return lastName;
	},
	email: function() {
		var email = Meteor.users.findOne(this.userObject._id).emails[0].address;
		return email;
	},
	userObject: function() {
		console.log(Meteor.users.findOne(this.userObject._id))
	}
});