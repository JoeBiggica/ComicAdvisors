Articles = new Mongo.Collection('articles');
Articles.attachSchema(ArticleSchema);
Articles.allow({
  update: function (userId, doc, fields, modifier) {
    if (userId && doc.userId === userId) {
      return true;
    }
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    if (userId && doc.userId === userId) {
      return true
    }
  }
});
Articles.deny({
  update: function (userId, doc, fields, modifier) {
    if (_.contains(fields, "createdAt") || _.contains(fields, "userId")) {
      return true;
    }
  },
  remove: function (userId, doc) {
    // can't remove locked documents
    return doc.locked;
  }
});