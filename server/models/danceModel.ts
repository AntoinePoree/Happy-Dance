import * as mongoose from 'mongoose';

const danceSchema = new mongoose.Schema({
  name: String,
  picture: String,
  galerie: Array,
  text: String,
  description: String,
  created_at: String,
});

const danceModel = mongoose.model('dance', danceSchema);

export default danceModel;
