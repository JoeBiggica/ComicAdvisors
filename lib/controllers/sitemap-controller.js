sitemapController = RouteController.extend({
	action: function() {
		SSR.compileTemplate('sitemap', Assets.getText('sitemap.xml'));

	    var html = SSR.render('sitemap');
	    return html;
	}
});