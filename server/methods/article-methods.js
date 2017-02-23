Meteor.methods({
  submitArticle: function(article) {
  	var user = Meteor.user();
  	if (!user)
  		throw new Meteor.Error(401, 'You need to log in first');
      
      var articleSlug = article.title.toLowerCase();
      articleSlug = articleSlug.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"");
      articleSlug = articleSlug.replace(/\s+/g, "-");
      console.log(articleSlug)
      var additionalParams = {
        createdAt: new Date(),
        userId: user._id,
        slug: articleSlug
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
    var article        = Articles.findOne(id),
        url            = 'http://www.comicadvisors.com/article/'+article.slug+'/'+article._id,
        urlEncoded     = encodeURIComponent(url),
        titleEncoded   = encodeURIComponent(article.title),
        defaultTags    = 'comics,comic,comicbooks,comic books,comicbook,comic book,comicadvisors,comic advisors,dc,dc comics,marvel,marvel comics',
        keywords       = article.tags.replace(/, /g,',')+defaultTags,
        newsKeywords   = keywords.replace(/,/g,';'),
        schemaKeywords = keywords.replace(/"/g, '\\"').replace(/\'/g, '\\u0027').replace(/,/g, '\",\"'),
        twitterURL     = 'http://www.twitter.com/intent/tweet?url=' + urlEncoded + '&via=comicadvisors&text=' + titleEncoded,
        facebookURL    = 'http://www.facebook.com/sharer/sharer.php?u=' + urlEncoded + '&t=' + titleEncoded;

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
      keywords: keywords,
      newsKeywords: newsKeywords,
      schemaKeywords: schemaKeywords,
      dateUTC: article.createdAt,
      twitterURL: twitterURL,
      facebookURL: facebookURL
    });
    return html;
  },

  ssrArticleAMP: function(id) {
    SSR.compileTemplate('articlePageAMP', Assets.getText('article-page-amp.html'));
    var article        = Articles.findOne(id),
        url            = 'http://www.comicadvisors.com/article/'+article.slug+'/'+article._id,
        urlEncoded     = encodeURIComponent(url),
        titleEncoded   = encodeURIComponent(article.title),
        defaultTags    = 'comics,comic,comicbooks,comic books,comicbook,comic book,comicadvisors,comic advisors,dc,dc comics,marvel,marvel comics',
        keywords       = article.tags.replace(/, /g,',')+defaultTags,
        newsKeywords   = keywords.replace(/,/g,';'),
        schemaKeywords = keywords.replace(/"/g, '\\"').replace(/\'/g, '\\u0027').replace(/,/g, '\",\"'),
        twitterURL     = 'http://www.twitter.com/intent/tweet?url=' + urlEncoded + '&via=comicadvisors&text=' + titleEncoded,
        facebookURL    = 'http://www.facebook.com/sharer/sharer.php?u=' + urlEncoded + '&t=' + titleEncoded;
        console.log(url)
    var html = SSR.render('articlePageAMP', {
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
      keywords: keywords,
      newsKeywords: newsKeywords,
      schemaKeywords: schemaKeywords,
      dateUTC: article.createdAt,
      twitterURL: twitterURL,
      facebookURL: facebookURL
    });
    return html;
  }
});