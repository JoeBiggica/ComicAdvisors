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
	},
	facebookURL: function() {
		var url = 'http://comicadvisors.com' + Router.current().route.path(this);
		var urlEncoded   = encodeURIComponent(url);
		var titleEncoded = encodeURIComponent(Articles.findOne(this._id).title);
		var shareURL = 'http://www.facebook.com/sharer/sharer.php?u=' + urlEncoded + '&t=' + titleEncoded;
		return shareURL;
	}
});

// Template.articlePage.onCreated(function() {
// 	DocHead.removeDocHeadAddedTags();

// 	var article         = Articles.findOne(Session.get("articleId")),
// 		url             = "http://comicadvisors.com" + this.url,
// 		title           = article.title,
// 		description     = article.description,
// 		author          = article.author,
// 		image           = article.imageSrc, 
// 		keywords        = article.tags,
// 		dateCreated     = moment(article.createdAt).format('MMM, DD YYYY'),
// 		dateUTC         = article.createdAt,
// 		section         = article.section,

// 		canonicalTag    = {rel: "canonical", content: url},
// 		descriptionTag  = {name: "description", content: description},
// 		authorTag       = {name: "author", content: author},
// 		imageTag        = {name: "image_src", content: image},
// 		keywordsTag     = {name: "keywords", content: keywords};

// 		ogEditionTag    = {name: "site edition", content: "Comic Advisors"},
// 		ogpublisherTag  = {name: "article:publisher", content: "https://www.facebook.com/comicadvisors"},
// 		ogLocaleTag     = {name: "og:locale", content: "en_US"},
// 		ogSiteNameTag   = {name: "og:site_name", content: "Comic Advisors"},
// 		ogTitleTag      = {name: "og:title", content: title},
// 		ogUrlTag        = {name: "og:url", content: url},  
// 		ogTypeTag       = {name: "og:type", content: "article"}, 
// 		ogDescTag       = {name: "og:description", content: description},
// 		ogImageTag      = {name: "og:image", content: image},
// 		ogPubTimeTag    = {name: "og:article:published_time", content: dateUTC},
// 		ogModTimeTag    = {name: "og:article:modified_time", content: dateUTC},
// 		ogSectionTag    = {name: "og:article:section", content: section},
// 		ogAuthorTag     = {name: "og:article:author", content: author},
// 		ogTagsTag       = {name: "og:article:tag", content: keywords},

// 		twSiteTag       = {name: "twitter:site", content: "@ComicAdivsors"},
// 		twCreatorTag    = {name: "twitter:creator", content: "@ComicAdvisors"},	
// 		twCardTag       = {name: "twitter:card", content: "summary_large_image"},	
// 		twTitleTag      = {name: "twitter:title", content: title},	
// 		twDescTag       = {name: "twitter:description", content: description},
// 		twImageSrcTag   = {name: "twitter:image:src", content: image},
// 		twImageTag      = {name: "twitter:image", content: image};		

// 	DocHead.setTitle(title);
// 	DocHead.addLink(canonicalTag);
// 	DocHead.addMeta(descriptionTag);
// 	DocHead.addMeta(authorTag);
// 	DocHead.addMeta(imageTag);
// 	DocHead.addMeta(keywordsTag);

// 	DocHead.addMeta(ogEditionTag);
// 	DocHead.addMeta(ogpublisherTag);
// 	DocHead.addMeta(ogLocaleTag);
// 	DocHead.addMeta(ogSiteNameTag);
// 	DocHead.addMeta(ogTitleTag);
// 	DocHead.addMeta(ogUrlTag);
// 	DocHead.addMeta(ogTypeTag);
// 	DocHead.addMeta(ogDescTag);
// 	DocHead.addMeta(ogImageTag);
// 	DocHead.addMeta(ogPubTimeTag);
// 	DocHead.addMeta(ogModTimeTag);
// 	DocHead.addMeta(ogSectionTag);
// 	DocHead.addMeta(ogAuthorTag);
// 	DocHead.addMeta(ogTagsTag);

// 	DocHead.addMeta(twSiteTag);
// 	DocHead.addMeta(twCreatorTag);
// 	DocHead.addMeta(twCardTag);
// 	DocHead.addMeta(twTitleTag);
// 	DocHead.addMeta(twDescTag);
// 	DocHead.addMeta(twImageSrcTag);
// 	DocHead.addMeta(twImageTag);

// 	var ldJsonSnippit = { 
// 		"@context": "http://schema.org",
//         "@type": "NewsArticle",
//         "mainEntityOfPage": {
//             "@type": "WebPage",
//             "@id": url
//         },
//         "headline": title,
//         "url": url,
//         "image": {
//             "@type": "ImageObject",
//             "url": image,
//             "width": "800",
//             "height": "800"
//         },
//         "thumbnailUrl": image,
//         "dateCreated": dateUTC,
//         "dateModified": dateUTC,
//         "datePublished": dateUTC,
//         "author": {
//             "@type": "Person",
//             "name": author
//         },
//         "publisher": {
//             "@type": "Organization",
//             "name": "Comic Advisors",
//             "logo": {
//                 "@type": "ImageObject",
//                 "url": "/resources/images/CA_Logo.png",
//                 "width": "200",
//                 "height": "200"
//             }
//         },
//         "description": description,
//         "articleSection": section,
//         "creator": [author],
//         "keywords": [keywords],
//         "about":"Article" 
// 	};
// 	DocHead.addLdJsonScript(ldJsonSnippit);
// });