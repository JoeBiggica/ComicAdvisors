sitemapController = RouteController.extend({
	action: function() {
		var response = this.response;
		Meteor.call('ssrSitemap', function(error, result) {
			if (result) {
				response.end(result);
			} else {
				console.log('Error: Sitemap could not be reached.');
			}
		})
	}
});