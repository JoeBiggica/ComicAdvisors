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
    SSR.compileTemplate('articlePageAMP', Assets.getText('article-page-amp.html'));
    var article = Articles.findOne(id);
    var html = SSR.render('articlePageAMP', {
      doctype: '<!DOCTYPE html>',
      section: article.section,
      title: article.title,
      primaryAsset: article.primaryAsset,
      author: article.author,
      formatDate: moment(article.createdAt).format('MMM, DD YYYY'),
      body: article.body
    });
    console.log('article requested');
    return html;
  }
});