var require = meteorInstall({"lib":{"collections":{"schemas":{"articles-schema.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/collections/schemas/articles-schema.js                                               //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
var articleFields = {                                                                       // 1
  title: {                                                                                  // 2
    type: String,                                                                           // 3
    label: 'Title',                                                                         // 4
    optional: false                                                                         // 5
  },                                                                                        // 2
  section: {                                                                                // 7
    type: String,                                                                           // 8
    label: 'Section',                                                                       // 9
    autoform: {                                                                             // 10
      type: 'select',                                                                       // 11
      options: [{ label: 'Comics', value: "comics" }, { label: 'Movies', value: "movies" }, { label: 'TV', value: "tv" }, { label: 'Games', value: "games" }, { label: 'Collectibles', value: "collectibles" }]
    },                                                                                      // 10
    optional: false                                                                         // 20
  },                                                                                        // 7
  primaryAsset: {                                                                           // 22
    type: String,                                                                           // 23
    label: 'Primary Asset',                                                                 // 24
    optional: false,                                                                        // 25
    autoform: {                                                                             // 26
      type: 'textarea',                                                                     // 27
      rows: 15,                                                                             // 28
      'class': 'primary-asset'                                                              // 29
    }                                                                                       // 26
  },                                                                                        // 22
  author: {                                                                                 // 32
    type: String,                                                                           // 33
    optional: false                                                                         // 34
  },                                                                                        // 32
  body: {                                                                                   // 36
    type: String,                                                                           // 37
    label: 'Body',                                                                          // 38
    autoform: {                                                                             // 39
      type: 'textarea',                                                                     // 40
      rows: 25,                                                                             // 41
      'class': 'body'                                                                       // 42
    },                                                                                      // 39
    optional: false                                                                         // 44
  },                                                                                        // 36
  tags: {                                                                                   // 46
    type: String,                                                                           // 47
    label: 'Tags (For Google)',                                                             // 48
    optional: false                                                                         // 49
  },                                                                                        // 46
  _id: {                                                                                    // 51
    type: String,                                                                           // 52
    optional: true,                                                                         // 53
    autoform: {                                                                             // 54
      omit: true                                                                            // 55
    }                                                                                       // 54
  },                                                                                        // 51
  userId: {                                                                                 // 58
    type: String,                                                                           // 59
    optional: true,                                                                         // 60
    autoform: {                                                                             // 61
      omit: true                                                                            // 62
    }                                                                                       // 61
  },                                                                                        // 58
  createdAt: {                                                                              // 65
    type: Date,                                                                             // 66
    optional: true,                                                                         // 67
    autoform: {                                                                             // 68
      omit: true                                                                            // 69
    }                                                                                       // 68
  }                                                                                         // 65
};                                                                                          // 1
                                                                                            //
ArticleSchema = new SimpleSchema(articleFields);                                            // 74
//////////////////////////////////////////////////////////////////////////////////////////////

}},"articles-collection.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/collections/articles-collection.js                                                   //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Articles = new Mongo.Collection('articles');                                                // 1
Articles.attachSchema(ArticleSchema);                                                       // 2
Articles.allow({                                                                            // 3
  update: function update(userId, doc, fields, modifier) {                                  // 4
    if (userId && doc.userId === userId) {                                                  // 5
      return true;                                                                          // 6
    }                                                                                       // 7
  },                                                                                        // 8
  remove: function remove(userId, doc) {                                                    // 9
    // can only remove your own documents                                                   //
    if (userId && doc.userId === userId) {                                                  // 11
      return true;                                                                          // 12
    }                                                                                       // 13
  }                                                                                         // 14
});                                                                                         // 3
Articles.deny({                                                                             // 16
  update: function update(userId, doc, fields, modifier) {                                  // 17
    if (_.contains(fields, "createdAt") || _.contains(fields, "userId")) {                  // 18
      return true;                                                                          // 19
    }                                                                                       // 20
  },                                                                                        // 21
  remove: function remove(userId, doc) {                                                    // 22
    // can't remove locked documents                                                        //
    return doc.locked;                                                                      // 24
  }                                                                                         // 25
});                                                                                         // 16
//////////////////////////////////////////////////////////////////////////////////////////////

}},"controllers":{"article-update.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/article-update.js                                                        //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
ArticleUpdateController = RouteController.extend({                                          // 1
	layoutTemplate: 'mainLayout',                                                              // 2
	template: 'articleUpdate',                                                                 // 3
	onBeforeAction: function onBeforeAction() {                                                // 4
		$('body').addClass('admin');                                                              // 5
		var user = Meteor.user();                                                                 // 6
		if (user) {                                                                               // 7
			if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {      // 8
				this.next();                                                                            // 9
			} else {                                                                                 // 10
				this.render('notFound');                                                                // 11
			}                                                                                        // 12
		} else {                                                                                  // 13
			this.render('notFound');                                                                 // 14
		}                                                                                         // 15
	},                                                                                         // 16
	onStop: function onStop() {                                                                // 17
		$('body').removeClass('admin');                                                           // 18
	},                                                                                         // 19
	waitOn: function waitOn() {                                                                // 20
		return Meteor.subscribe('singleArticle', this.params._id);                                // 21
	},                                                                                         // 22
	data: function data() {                                                                    // 23
		return { article: Articles.findOne(this.params._id) };                                    // 24
	}                                                                                          // 25
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"base.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/base.js                                                                  //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
BaseController = RouteController.extend({                                                   // 1
  layoutTemplate: 'mainLayout'                                                              // 2
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"homepage.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/homepage.js                                                              //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
HomepageController = RouteController.extend({                                               // 1
	layoutTemplate: 'mainLayout',                                                              // 2
	template: 'homepage',                                                                      // 3
	findOptions: function findOptions() {                                                      // 4
		return { sort: { createdAt: -1 } };                                                       // 5
	},                                                                                         // 6
	waitOn: function waitOn() {                                                                // 7
		return Meteor.subscribe('allArticles', this.findOptions());                               // 8
	},                                                                                         // 9
	data: function data() {                                                                    // 10
		return { articles: Articles.find({}, { sort: { createdAt: -1 } }) };                      // 11
	}                                                                                          // 12
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"new-article.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/new-article.js                                                           //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
NewArticleController = RouteController.extend({                                             // 1
	layoutTemplate: 'mainLayout',                                                              // 2
	template: 'newArticle',                                                                    // 3
	onBeforeAction: function onBeforeAction() {                                                // 4
		$('body').addClass('admin');                                                              // 5
		var user = Meteor.user();                                                                 // 6
		if (user) {                                                                               // 7
			if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {      // 8
				this.next();                                                                            // 9
			} else {                                                                                 // 10
				this.render('notFound');                                                                // 11
			}                                                                                        // 12
		} else {                                                                                  // 13
			this.render('notFound');                                                                 // 14
		}                                                                                         // 15
	},                                                                                         // 16
	onStop: function onStop() {                                                                // 17
		$('body').removeClass('admin');                                                           // 18
	}                                                                                          // 19
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"section.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/section.js                                                               //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
SectionController = RouteController.extend({                                                // 1
    layoutTemplate: 'mainLayout',                                                           // 2
    template: "sectionArticlesPage",                                                        // 3
    onBeforeAction: function onBeforeAction() {                                             // 4
        Session.set("querySection", this.params.section);                                   // 5
        this.next();                                                                        // 6
    },                                                                                      // 7
    data: function data() {                                                                 // 8
        var section = this.params.section;                                                  // 9
        var articles = Meteor.subscribe("sectionArticles", section);                        // 10
        return {                                                                            // 11
            articles: Articles.find({}, { sort: { createdAt: -1 } })                        // 12
        };                                                                                  // 11
    }                                                                                       // 14
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"single-article.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/single-article.js                                                        //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
SingleArticleController = RouteController.extend({                                          // 1
	layoutTemplate: 'mainLayout',                                                              // 2
	template: 'articlePage',                                                                   // 3
	onBeforeAction: function onBeforeAction() {                                                // 4
		$('body').addClass('article');                                                            // 5
		this.next();                                                                              // 6
	},                                                                                         // 7
	onStop: function onStop() {                                                                // 8
		$('body').removeClass('article');                                                         // 9
	},                                                                                         // 10
	waitOn: function waitOn() {                                                                // 11
		return Meteor.subscribe('singleArticle', this.params._id);                                // 12
	},                                                                                         // 13
	data: function data() {                                                                    // 14
		return Articles.findOne(this.params._id);                                                 // 15
	}                                                                                          // 16
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"user-list.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/user-list.js                                                             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
UserListController = RouteController.extend({                                               // 1
	layoutTemplate: 'mainLayout',                                                              // 2
	template: 'userList',                                                                      // 3
	onBeforeAction: function onBeforeAction() {                                                // 4
		$('body').addClass('admin');                                                              // 5
		this.next();                                                                              // 6
	},                                                                                         // 7
	onStop: function onStop() {                                                                // 8
		$('body').removeClass('admin');                                                           // 9
	},                                                                                         // 10
	waitOn: function waitOn() {                                                                // 11
		return Meteor.subscribe('userList');                                                      // 12
	},                                                                                         // 13
	data: function data() {                                                                    // 14
		return { users: Meteor.users.find() };                                                    // 15
	}                                                                                          // 16
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"user-login.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/user-login.js                                                            //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
UserLoginController = RouteController.extend({                                              // 1
	layoutTemplate: 'mainLayout',                                                              // 2
	template: 'userLogin'                                                                      // 3
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"user-profile.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/controllers/user-profile.js                                                          //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
UserProfileController = RouteController.extend({                                            // 1
  layoutTemplate: 'mainLayout',                                                             // 2
  template: "userPage",                                                                     // 3
  onBeforeAction: function onBeforeAction() {                                               // 4
    $('body').addClass('admin');                                                            // 5
    var username = Router.current().params.username;                                        // 6
    var user = Meteor.users.findOne({ username: username });                                // 7
    if (user) {                                                                             // 8
      if (Meteor.user()) {                                                                  // 9
        if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {
          this.next();                                                                      // 11
        } else {                                                                            // 12
          this.render('notFound');                                                          // 13
        }                                                                                   // 14
      } else {                                                                              // 15
        this.render('notFound');                                                            // 16
      }                                                                                     // 17
    } else {                                                                                // 18
      this.render('notFound');                                                              // 19
    }                                                                                       // 20
    Session.set("queryUsername", username);                                                 // 21
  },                                                                                        // 22
  onStop: function onStop() {                                                               // 23
    $('body').removeClass('admin');                                                         // 24
  },                                                                                        // 25
  waitOn: function waitOn() {                                                               // 26
    return Meteor.subscribe("userProfile", this.params.username);                           // 27
  },                                                                                        // 28
  data: function data() {                                                                   // 29
    var username = Router.current().params.username;                                        // 30
    var user = Meteor.users.findOne({ username: username });                                // 31
    var articles = Meteor.subscribe("userArticlesList", username);                          // 32
    return {                                                                                // 33
      userObject: user,                                                                     // 34
      articles: Articles.find({}, { sort: { createdAt: -1 } })                              // 35
    };                                                                                      // 33
  }                                                                                         // 37
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

}},"router.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// lib/router.js                                                                            //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Router.configure({                                                                          // 1
	loadingTemplate: 'spinner',                                                                // 2
	notFoundTemplate: 'notFound'                                                               // 3
});                                                                                         // 1
                                                                                            //
Router.route('/', {                                                                         // 6
	name: 'root',                                                                              // 7
	controller: 'HomepageController'                                                           // 8
});                                                                                         // 6
                                                                                            //
Router.route('/article/:title/id:_id', {                                                    // 11
	name: 'singleArticle',                                                                     // 12
	controller: 'SingleArticleController'                                                      // 13
});                                                                                         // 11
                                                                                            //
Router.route('/section/:section', {                                                         // 16
	name: 'sectionArticles',                                                                   // 17
	controller: 'SectionController'                                                            // 18
});                                                                                         // 16
                                                                                            //
Router.route('admin/batcave/login', {                                                       // 21
	name: 'userLogin',                                                                         // 22
	controller: 'UserLoginController'                                                          // 23
});                                                                                         // 21
Router.route('admin/batcave/new', {                                                         // 25
	name: 'newArticle',                                                                        // 26
	controller: 'NewArticleController'                                                         // 27
});                                                                                         // 25
                                                                                            //
Router.route('admin/batcave/users', {                                                       // 30
	name: 'userList',                                                                          // 31
	controller: 'UserListController'                                                           // 32
});                                                                                         // 30
                                                                                            //
Router.route('admin/batcave/users/:username', {                                             // 35
	name: 'userPage',                                                                          // 36
	controller: 'UserProfileController'                                                        // 37
});                                                                                         // 35
                                                                                            //
Router.route('admin/batcave/users/:username/article/id:_id', {                              // 40
	name: 'articleUpdate',                                                                     // 41
	controller: 'ArticleUpdateController'                                                      // 42
});                                                                                         // 40
//////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"methods":{"article-methods.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/methods/article-methods.js                                                        //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Meteor.methods({                                                                            // 1
  submitArticle: function submitArticle(article) {                                          // 2
    var user = Meteor.user();                                                               // 3
    if (!user) throw new Meteor.Error(401, 'You need to log in first');                     // 4
                                                                                            //
    var additionalParams = {                                                                // 7
      createdAt: new Date(),                                                                // 8
      userId: user._id                                                                      // 9
    };                                                                                      // 7
                                                                                            //
    _.extend(article, additionalParams);                                                    // 12
    article._id = Articles.insert(article);                                                 // 13
                                                                                            //
    return article;                                                                         // 15
  },                                                                                        // 16
  updateArticle: function updateArticle(id) {                                               // 17
    var article = Articles.find(id);                                                        // 18
    return article;                                                                         // 19
  }                                                                                         // 20
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

},"user-methods.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/methods/user-methods.js                                                           //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Meteor.methods({                                                                            // 1
	isAdmin: function isAdmin() {                                                              // 2
		if (Meteor.user()) {                                                                      // 3
			if (Meteor.user().username == "joebiggs" || Meteor.user().username == "richrich") {      // 4
				return true;                                                                            // 5
			} else {                                                                                 // 6
				return false;                                                                           // 7
			}                                                                                        // 8
		} else {                                                                                  // 9
			return false;                                                                            // 10
		}                                                                                         // 11
	},                                                                                         // 12
	checkUserExists: function checkUserExists(username) {                                      // 13
		var userFind = Meteor.users.findOne({ username: username });                              // 14
		if (userFind) {                                                                           // 15
			return true;                                                                             // 16
		} else {                                                                                  // 17
			console.log('User Already Exists');                                                      // 18
		}                                                                                         // 19
	},                                                                                         // 20
	getUserId: function getUserId(username) {                                                  // 21
		var user = Meteor.users.findOne({ username: username });                                  // 22
		var userId = user._id;                                                                    // 23
		return userId;                                                                            // 24
	}                                                                                          // 25
});                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"article-publications.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/publications/article-publications.js                                              //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Meteor.publish('allArticles', function () {                                                 // 1
	return Articles.find();                                                                    // 2
});                                                                                         // 3
                                                                                            //
Meteor.publish('singleArticle', function (id) {                                             // 5
	return Articles.find(id);                                                                  // 6
});                                                                                         // 7
                                                                                            //
Meteor.publish('sectionArticles', function (section) {                                      // 9
	return Articles.find({ section: section });                                                // 10
});                                                                                         // 11
//////////////////////////////////////////////////////////////////////////////////////////////

},"user-publications.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/publications/user-publications.js                                                 //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Meteor.publish("userProfile", function (username) {                                         // 1
	var user = Meteor.users.findOne({ username: username });                                   // 2
                                                                                            //
	if (!user) {                                                                               // 4
		this.ready();                                                                             // 5
		return;                                                                                   // 6
	}                                                                                          // 7
                                                                                            //
	if (this.userId == user._id) {                                                             // 9
		return Meteor.users.find(this.userId);                                                    // 10
	} else {                                                                                   // 11
		return Meteor.users.find(user._id);                                                       // 12
		// return Meteor.users.find(user._id, {                                                   //
		// 	fields: {                                                                             //
		// 		"profile": 0                                                                         //
		// 	}                                                                                     //
		// });                                                                                    //
	}                                                                                          // 18
});                                                                                         // 19
                                                                                            //
Meteor.publish('userList', function () {                                                    // 21
	return Meteor.users.find();                                                                // 22
});                                                                                         // 23
                                                                                            //
Meteor.publish('userArticlesList', function (username) {                                    // 25
	var user = Meteor.users.findOne({ username: username });                                   // 26
	return Articles.find({ userId: user._id });                                                // 27
});                                                                                         // 28
//////////////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json"]});
require("./lib/collections/schemas/articles-schema.js");
require("./lib/collections/articles-collection.js");
require("./lib/controllers/article-update.js");
require("./lib/controllers/base.js");
require("./lib/controllers/homepage.js");
require("./lib/controllers/new-article.js");
require("./lib/controllers/section.js");
require("./lib/controllers/single-article.js");
require("./lib/controllers/user-list.js");
require("./lib/controllers/user-login.js");
require("./lib/controllers/user-profile.js");
require("./lib/router.js");
require("./server/methods/article-methods.js");
require("./server/methods/user-methods.js");
require("./server/publications/article-publications.js");
require("./server/publications/user-publications.js");
//# sourceMappingURL=app.js.map
