Template.articlePage.helpers({
	formatDate: function() {
		var createdAt = Articles.findOne(this._id).createdAt;
		return moment(createdAt).format('MMM, DD YYYY')
	}
})