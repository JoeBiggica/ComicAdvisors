SectionController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: "sectionArticlesPage",
    onBeforeAction: function() {
        Session.set("querySection", this.params.section);
        this.next();
    },
    findOptions: function() {
        return { sort: { createdAt: -1 } };
    },
    waitOn: function() {
        Meteor.subscribe('allQuotes', this.findOptions());
    },
    data: function(){
        var section = this.params.section;
        var articles = Meteor.subscribe("sectionArticles", section);
        return {
            articles: Articles.find({}, { sort: { createdAt: -1 } }),
            quotes: Quotes.find({}, { sort: { createdAt: -1 }, limit: 1})
        }
    }
});