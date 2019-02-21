import * as mongoose from 'mongoose';

const danceSchema = new mongoose.Schema({
  name: String,
  picture1: String,
  picture2: String,
  picture3: String,
  text: String,
  description: String,
  created_at: String,
});

const danceModel = mongoose.model('dance', danceSchema);

export default danceModel;
