Meteor.methods({
  submitQuote: function(quote) {
  	var user = Meteor.user();
  	if (!user)
  		throw new Meteor.Error(401, 'You need to log in first');
      
      var additionalParams = {
        createdAt: new Date(),
        userId: user._id
      }

      _.extend(quote, additionalParams);
      quote._id = Quotes.insert(quote);

      return quote;
  },

  updatequote: function(id) {
    var quote = Quotes.find(id);
    return quote;
  }
});