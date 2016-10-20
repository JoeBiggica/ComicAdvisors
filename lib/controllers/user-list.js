UserListController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'userList',
	waitOn: function() {
		return Meteor.subscribe('userList');
	},
	data: function() {
		return { users: Meteor.users.find() };
	}
});