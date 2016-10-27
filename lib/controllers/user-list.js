UserListController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'userList',
	onBeforeAction: function() {
        $('body').addClass('admin');
        this.next();
	},
    onStop: function() {
        $('body').removeClass('admin');
    },
	waitOn: function() {
		return Meteor.subscribe('userList');
	},
	data: function() {
		return { users: Meteor.users.find() };
	}
});