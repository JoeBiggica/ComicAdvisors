Router.configure({
	layoutTemplate: 'mainLayout',
	loadingTemplate: 'spinner',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'root',
	controller: 'HomepageController'
});

Router.route('/article/:slug/:_id', {
	name: 'singleArticle',
	controller: articleStaticController,
	where: "server"
});

Router.route('/section/:section', {
	name: 'sectionArticles',
	controller: 'SectionController'
});

Router.route('admin/batcave/login', {
	name: 'userLogin',
	controller: 'UserLoginController'
});

Router.route('admin/batcave/new', {
	name: 'newArticle',
	controller: 'NewArticleController'
});

Router.route('admin/batcave/users', {
	name: 'userList',
	controller: 'UserListController'
});

Router.route('admin/batcave/users/:username', {
	name: 'userPage',
	controller: 'UserProfileController'
});

Router.route('admin/batcave/users/:username/article/id:_id', {
	name: 'articleUpdate',
	controller: 'ArticleUpdateController'
});

// Router.route('/sitemap', {
// 	name: 'sitemap',
// 	controller: sitemapController,
// 	where: "server"
// });