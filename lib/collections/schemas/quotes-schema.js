var quoteFields = {
  quote: {
    type: String,
    label: 'Quote',
    optional: false,
    autoform : {
      type: 'textarea',
      rows: 4,
      class: 'quote-text'
    }
  },
  photo: {
    type: String,
    label: 'Quote Photo',
    optional: false
  },
  character: {
    type: String,
    optional: false
  },
  comicSource: {
    type: String,
    label: 'Comic Source',
    optional: false
  },
  writer: {
    type: String,
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

QuoteSchema = new SimpleSchema(quoteFields);