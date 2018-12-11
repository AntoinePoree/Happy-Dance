import * as mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  name: String,
  title: String,
  picture: String,
  text: String,
  author: String,
  description: String,
  created_at: String,
});

const articleModel = mongoose.model('article', articleSchema);

export default articleModel;
