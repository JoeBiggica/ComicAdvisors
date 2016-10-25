Meteor.publish('allArticles', function() {
	return Articles.find();
});

Meteor.publish('singleArticle', function(id) {
	return Articles.find(id);
});
