SectionController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: "sectionPage",
    onBeforeAction: function() {
        Session.set("querySection", this.params.section);
        this.next();
    },
    data: function(){
        return {
        	articles: Articles.find({section: this.params.section}, { sort: { createdAt: -1 } })
        }
    }
});