Router.configure({
	loadingTemplate: 'spinner',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/article/:title/id:_id', {
	name: 'singleArticle',
	controller: 'SingleArticleController'
});

Router.route('admin/new', {
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

Router.route('admin/users/:username/article/id:_id', {
	template: 'articleUpdate',
	controller: 'ArticleUpdateController'
});