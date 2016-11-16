SingleArticleController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'articlePage',
	onBeforeAction: function() {
		DocHead.removeDocHeadAddedTags();

		var article        = Articles.findOne(this.params._id),
			url            = "http://comicadvisors.com" + this.url,
			description    = article.description,
			canonicalTag   = {rel: "canonical", content: url},
			descriptionTag = {name: "description", content: description};

		DocHead.setTitle(article.title);
		DocHead.addLink(canonicalTag);
		DocHead.addMeta(descriptionTag);

		$('body').addClass('article');
		console.log(article)
		this.next();
	},
	onStop: function() {
		$('body').removeClass('article');
	},
	waitOn: function() {
		return Meteor.subscribe('singleArticle', this.params._id);
	},
	data: function() {
		return Articles.findOne(this.params._id);
	}
});