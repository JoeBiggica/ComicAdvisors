Router.configure({
	loadingTemplate: 'spinner',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/admin/new', {
  name: 'newArticle',
  controller: 'NewArticleController'
});

Router.route('admin/users', {
	name: 'userList',
	controller: 'UserListController'
});

Router.route('admin/users/:username', {
	template: 'userPage',
	controller: 'UserProfileController'
});

Router.route('/article/:title/:_id', {
	name: 'singleArticle',
	controller: 'SingleArticleController'
});