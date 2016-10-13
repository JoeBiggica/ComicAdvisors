Router.configure({
	loadingTemplate: 'spinner',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/new', {
  name: 'newPost',
  controller: 'BaseController'
});

Router.route('/article/:title/:_id', {
	name: 'singlePost',
	controller: 'SinglePostController'
});

Router.route('admin/users', {
	template: 'userList',
	waitOn: function() {
		return Meteor.subscribe('userList');
	},
	data: function() {
		return {users: Meteor.users.find()};
	}
});

Router.route('users/:username', {
	template: 'userPage',
	controller: 'ProfileController'
	// data: function() {
	// 	return {user: Meteor.users.findOne({_id: })};
	// }
});

Router.onBeforeAction(function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}, {only: 'newPost'});