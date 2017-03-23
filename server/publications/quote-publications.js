Meteor.publish('allQuotes', function() {
	return Quotes.find();
});