Meteor.methods({

	ssrSitemap: function(){
		SSR.compileTemplate('sitemap', Assets.getText('sitemap.txt'));
		var articles = Articles.find({}).fetch();

		for(i=0; articles.length > i; i++){
			console.log(articles[i])
		}




	    var html = SSR.render('sitemap');
	    return html;
	}
});