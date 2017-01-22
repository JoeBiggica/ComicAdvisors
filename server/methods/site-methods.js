Meteor.methods({

	ssrSitemap: function(){
		SSR.compileTemplate('sitemap', Assets.getText('sitemap.txt'));
		var articles = Articles.find({}).fetch();
		var urlList = '';
		for(i=0; articles.length > i; i++){
			urlList = urlList + 'http://www.comicadvisors.com/article/'+articles[i].slug+'/'+articles[i]._id+'\r\n'
		}
		
	    var html = SSR.render('sitemap',{
	    	urlList: urlList
	    });
	    return html;
	}
});