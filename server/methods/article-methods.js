Meteor.methods({
  submitArticle: function(article) {
  	var user = Meteor.user();
  	if (!user)
  		throw new Meteor.Error(401, 'You need to log in first');

    var additionalParams = {
      createdAt: new Date(),
      userId: user._id
    }

    _.extend(article, additionalParams);
    article._id = Articles.insert(article);

    return article;
  },
  updateArticle: function(id) {
    var article = Articles.find(id);
    return article;
  },
  ssrArticle: function(id) {
    SSR.compileTemplate('articlePageStatic', Assets.getText('article-page-static.html'));
    var article      = Articles.findOne(id),
        url          = 'https://www.comicadvisors.com/article/'+encodeURIComponent(article.title)+'/id:'+article._id,
        urlEncoded   = encodeURIComponent(url),
        titleEncoded = encodeURIComponent(article.title),
        twitterURL   = 'http://www.twitter.com/intent/tweet?url=' + urlEncoded + '&via=comicadvisors&text=' + titleEncoded,
        facebookURL  = 'http://www.facebook.com/sharer/sharer.php?u=' + urlEncoded + '&t=' + titleEncoded;

    var html = SSR.render('articlePageStatic', {
      doctype: '<!DOCTYPE html>',
      url: url,
      section: article.section,
      title: article.title,
      primaryAsset: article.primaryAsset,
      author: article.author,
      formatDate: moment(article.createdAt).format('MMM, DD YYYY'),
      body: article.body,
      description: article.description,
      image: article.imageSrc, 
      keywords: article.tags,
      dateUTC: article.createdAt,
      twitterURL: twitterURL,
      facebookURL: facebookURL
    });
    return html;
  }
});