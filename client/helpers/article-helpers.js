Template.articlePage.helpers({
	formatDate: function() {
		var createdAt = Articles.findOne(this._id).createdAt;
		return moment(createdAt).format('MMM, DD YYYY')
	}
});

Template.shareTools.helpers({
	twitterURL: function() {
		var url = 'http://comicadvisors.com' + Router.current().route.path(this);
		var urlEncoded   = encodeURIComponent(url);
		var titleEncoded = encodeURIComponent(Articles.findOne(this._id).title);
		var shareURL     = 'http://www.twitter.com/intent/tweet?url=' + urlEncoded + '&via=comicadvisors&text=' + titleEncoded;
		return shareURL;
	}
})