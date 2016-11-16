SingleArticleController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'articlePage',
	onBeforeAction: function() {
		DocHead.removeDocHeadAddedTags();

		var article         = Articles.findOne(this.params._id),
			url             = "http://comicadvisors.com" + this.url,
			title           = article.title,
			description     = article.description,
			author          = article.author,
			image           = article.imageSrc, 
			keywords        = article.tags,
			dateCreated     = moment(article.createdAt).format('MMM, DD YYYY'),
			dateUTC         = article.createdAt,
			section         = article.section,

			canonicalTag    = {rel: "canonical", content: url},
			descriptionTag  = {name: "description", content: description},
			authorTag       = {name: "author", content: author},
			imageTag        = {name: "image_src", content: image},
			keywordsTag     = {name: "keywords", content: keywords};

			ogEditionTag    = {name: "site edition", content: "Comic Advisors"},
			ogpublisherTag  = {name: "article:publisher", content: "https://www.facebook.com/comicadvisors"},
			ogLocaleTag     = {name: "og:locale", content: "en_US"},
			ogSiteNameTag   = {name: "og:site_name", content: "Comic Advisors"},
			ogTitleTag      = {name: "og:title", content: title},
			ogUrlTag        = {name: "og:url", content: url},  
			ogTypeTag       = {name: "og:type", content: "article"}, 
			ogDescTag       = {name: "og:description", content: description},
			ogImageTag      = {name: "og:image", content: image},
			ogPubTimeTag    = {name: "og:article:published_time", content: dateUTC},
			ogModTimeTag    = {name: "og:article:modified_time", content: dateUTC},
			ogSectionTag    = {name: "og:article:section", content: section},
			ogAuthorTag     = {name: "og:article:author", content: author},
			ogTagsTag       = {name: "og:article:tag", content: keywords},

			twSiteTag       = {name: "twitter:site", content: "@ComicAdivsors"},
			twCreatorTag    = {name: "twitter:creator", content: "@ComicAdvisors"},	
			twCardTag       = {name: "twitter:card", content: "summary_large_image"},	
			twTitleTag      = {name: "twitter:title", content: title},	
			twDescTag       = {name: "twitter:description", content: description},
			twImageSrcTag   = {name: "twitter:image:src", content: image},
			twImageTag      = {name: "twitter:image", content: image};		

		DocHead.setTitle(title);
		DocHead.addLink(canonicalTag);
		DocHead.addMeta(descriptionTag);
		DocHead.addMeta(authorTag);
		DocHead.addMeta(imageTag);
		DocHead.addMeta(keywordsTag);

		DocHead.addMeta(ogEditionTag);
		DocHead.addMeta(ogpublisherTag);
		DocHead.addMeta(ogLocaleTag);
		DocHead.addMeta(ogSiteNameTag);
		DocHead.addMeta(ogTitleTag);
		DocHead.addMeta(ogUrlTag);
		DocHead.addMeta(ogTypeTag);
		DocHead.addMeta(ogDescTag);
		DocHead.addMeta(ogImageTag);
		DocHead.addMeta(ogPubTimeTag);
		DocHead.addMeta(ogModTimeTag);
		DocHead.addMeta(ogSectionTag);
		DocHead.addMeta(ogAuthorTag);
		DocHead.addMeta(ogTagsTag);

		DocHead.addMeta(twSiteTag);
		DocHead.addMeta(twCreatorTag);
		DocHead.addMeta(twCardTag);
		DocHead.addMeta(twTitleTag);
		DocHead.addMeta(twDescTag);
		DocHead.addMeta(twImageSrcTag);
		DocHead.addMeta(twImageTag);

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