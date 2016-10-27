var articleFields = {
  title: {
    type: String,
    label: 'Title',
    optional: false
  },
  section: {
    type: String,
    label: 'Section',
    autoform: {
      type: 'select',
      options: [
        {label: 'Comics', value: "Comics"},
        {label: 'Movies', value: "Movies"},
        {label: 'TV', value: "TV"},
        {label: 'Games', value: "Games"},
        {label: 'Collectibles', value: "Collectibles"}
      ]
    },
    optional: false
  },
  primaryAsset: {
    type: String,
    label: 'Primary Asset',
    optional: false,
    autoform : {
      type: 'textarea',
      rows: 15,
      class: 'primary-asset'
    }
  },
  author: {
    type: String,
    optional: false
  },
  body: {
    type: String,
    label: 'Body',
    autoform: {
      type: 'textarea',
      rows: 25,
      class: 'body'
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