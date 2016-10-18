UserListController = BaseController.extend({
	template: 'userList',
	waitOn: function() {
		return Meteor.subscribe('userList');
	},
	data: function() {
		return {users: Meteor.users.find()};
	}
});