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
  channel: {
    type: String,
    label: 'Channel',
    autoform: {
      type: 'select',
      options: [
        {label: 'Comics', value: "Comics"},
        {label: 'Movies', value: "Movies"},
        {label: 'TV', value: "TV"},
        {label: 'Games', value: "Games"},
        {label: 'Collectibles', value: "Collectibles"},
      ]
    },
    optional: false
  },
  body: {
    type: String,
    label: 'Body',
    autoform: {
      type: 'textarea',
      rows: 25
    },
    optional: false
  },
  tags: {
    type: String,
    label: 'Tags (For Google)',
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