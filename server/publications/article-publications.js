Meteor.publish('allArticles', function() {
	return Articles.find();
});

Meteor.publish('singleArticle', function(id) {
	return Articles.find(id);
});

Meteor.publish('selectArticles', function(index) {
	return Articles.find({}, { sort: { createdAt: -1 }, limit: 10, skip: index  });
});

Meteor.publish('sectionArticles', function(section) {
	return Articles.find({section: section});
});