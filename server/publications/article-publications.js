Meteor.publish('allArticles', function() {
	return Articles.find();
});

Meteor.publish('singleArticle', function(id) {
	return Articles.find(id);
});

Meteor.publish('sectionArticles', function(section) {
	return Articles.find({section: section});
});

SSR.compileTemplate('articlePageAMP', Assets.getText('article-page-amp.html'));