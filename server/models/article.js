let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const articleSchema = new Schema({
  title:  {
      type : String,
      required : [true, "title is required, please fill in this field"]
  },
  content: {
      type : String,
      required : [true, "content is required, please fill in this field"]
  },
  link : String,
  UserId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps:true});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
