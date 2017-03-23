Template.quoteList.helpers({
	quote: function() {
		return Quotes.findOne(this._id).quote;
	},
	photo: function() {
		return Quotes.findOne(this._id).photo;
	}
});