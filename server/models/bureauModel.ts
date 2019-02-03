import * as mongoose from 'mongoose';

const bureauSchema = new mongoose.Schema({
  name: String,
  surname: String,
  photo: String,
  resume: String,
});

const bureauModel = mongoose.model('bureau', bureauSchema);

export default bureauModel;
