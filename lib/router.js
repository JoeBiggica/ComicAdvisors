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
	controller: ArticleStaticController,
	where: "server"
});

Router.route('/article/amp/:slug/:_id', {
	name: 'singleArticleAMP',
	controller: ArticleAMPController,
	where: "server"
});

Router.route('/articles/:page', {
	name: 'nextArticles',
	controller: 'NextArticlesController'
});

Router.route('/section/:section', {
	name: 'sectionArticles',
	controller: 'SectionController'
});

Router.route('/comics/quotes', {
	name: 'quoteList',
	controller: 'QuoteListController'
});

Router.route('admin/batcave/login', {
	name: 'userLogin',
	controller: 'UserLoginController'
});

Router.route('admin/batcave/new', {
	name: 'newArticle',
	controller: 'NewArticleController'
});

Router.route('admin/batcave/new-quote', {
	name: 'newQuote',
	controller: 'NewQuoteController'
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

Router.route('/admin/batcave/sitemap', {
	name: 'sitemap',
	controller: sitemapController,
	where: "server"
});

Router._filters = {
  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  }
};

var filters = Router._filters;

if(Meteor.isClient) {
  Router.onAfterAction(filters.resetScroll); // for all pages
}