var articleFields = {
  title: {
    type: String,
    label: 'Title',
    optional: false
  },
  author: {
    type: String,
    optional: false
  },
  primaryAsset: {
    type: String,
    label: 'Primary Image',
    optional: false
  },
  body: {
    type: String,
    label: 'Body',
    autoform: {
      type: 'textarea',
      rows: 40
    },
    optional: false
  },
  _id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  userId: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }
};

ArticleSchema = new SimpleSchema(articleFields);