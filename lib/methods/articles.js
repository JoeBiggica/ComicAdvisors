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
  // updateArticle: function(article) {
  //   console.log(article)
  // }
});