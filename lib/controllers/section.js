SectionController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: "sectionArticlesPage",
    onBeforeAction: function() {
        Session.set("querySection", this.params.section);
        this.next();
    },
    data: function(){
        var section = this.params.section;
        var articles = Meteor.subscribe("sectionArticles", section);
        return {
            articles: Articles.find({}, { sort: { createdAt: -1 } })
        }
    }
});